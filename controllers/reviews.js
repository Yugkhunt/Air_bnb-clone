const Listing=require("../model/listing");
const Review=require("../model/review");



module.exports.createReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","new review is created!");
    res.redirect(`/listings/${listing._id}`);
}


module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review is deleted!!");
    res.redirect(`/listings/${id}`);
}