import UserModel from '../mongooseSchema/model/user.model';

export default class MapController {

  static getEnteredUser(req, res, next) {
    const { bottomLeft, upperRight } = req.body;
    const query = UserModel.find({
      coordinate: {
        $geoWithin: {
          $box: [bottomLeft, upperRight],
        },
      },
    });
    query.exec()
      .then((users) => {
        if (users) return res.status(400).send(users);
        return res.status(200).json(users);
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Database internal error.'
        });
      });
  }
}
