import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    rol:{type:String,required:true},
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone: {type: String, required:false},
    state:{type:Number,default: 1},//1 ES ACTIVO 2 ES INACTIVO
},{
    timestamps: true
});

const User = mongoose.model("User",UserSchema);
export default User;