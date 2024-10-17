const Book = require('../models/Book');
const fs = require('fs');

//Function for the average of the book’s scores
const average = (array) => {
    let sum = 0
    for (let nb of array) {
      sum += nb
    }
    return (sum / array.length).toFixed(1) // Converts the rounded average to a decimal point
  }

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    if (bookObject.ratings[0].grade !== 0) {
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      averageRating: bookObject.ratings[0].grade,
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  } else {
    res.status(400).json('Vous devez noter le livre')
  };
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  };

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body };

delete bookObject._userId;
Book.findOne({_id: req.params.id})
    .then((book) => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
        } else {
            Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Livre modifié!'}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
};

/* Rating function */
exports.ratingBook = async (req, res, next) => {
    if (0 <= req.body.rating <= 5) {
      const ratingObject = { ...req.body, grade: req.body.rating }
      delete ratingObject._id
      const book = await Book.findOne({ _id: req.params.id })
      Book.findOne({ _id: req.params.id })
        .then((book) => {
          // Collect all the ratings of the book
          const bookRatings = book.ratings
          const userIdArray = bookRatings.map((rating) => rating.userId)
          // Verify if the user has already rated the book
          if (userIdArray.includes(req.auth.userId)) {
            res.status(403).json({ message: 'Vous avez déjà noté le livre' })
          } else {
            //Add the new rating to the book
            bookRatings.push(ratingObject)
            const grades = bookRatings.map((rating) => rating.grade)
            // Create the average of the grades
            const averageGrades = average(grades)
            book.averageRating = averageGrades
            // Update the book with the new rating
            Book.updateOne(
              { _id: req.params.id },
              {
                ratings: bookRatings,
                averageRating: averageGrades,
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(201).json(book)
              })
              .catch((error) => {
                res.status(400).json({ error })
              })
          }
        })
        .catch((error) => {
          res.status(404).json({ error })
        })
    } else {
      res.status(400).json({ message: 'La note doit être comprise entre 1 et 5' })
    }
  }
  
  exports.getBestRating = (req, res, next) => {
    Book.find()
      .sort({ averageRating: -1 }) // Sort by descending rating
      .limit(3) // Limite to 3 books
      .then((books) => res.status(200).json(books))
      .catch((error) => res.status(400).json({ error }))
  };