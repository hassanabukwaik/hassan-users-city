const City = require("../model/City");
const User = require("../model/User");

exports.createCity = async (req, res, next) => {
  const {
    body: { name, country, user },
  } = req;
  try {
    const city = await City.create({ name, country, user });
    await User.updateOne(
      { _id: user },
      {
        city: city._id,
      }
    );

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "server error",
    });
  }
};
