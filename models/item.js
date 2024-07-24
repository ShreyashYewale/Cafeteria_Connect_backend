//Item can be any like Upma,Udid Wada,Wada Pav,or any lunch item.

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    status:{
        type:String,         //Status in this case will be available,not available,finishing soon
        required:true,
        maxlength:32,
    },
    category: {                //Category in this case will be breakfast,snack or lunch
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
