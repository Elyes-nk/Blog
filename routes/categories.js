//capacité a utilisé les routes 
const router = require("express").Router();
const Category = require("../models/Category");


//CREATE 
router.post("/", async(req,res)=>{
    const newCategory = new Category(req.body);
    try{
        const savedCategory = newCategory.save();
        res.status(200).json(savedCategory);
    }catch(err){
        res.status(500).json(500);
    }
});



//UPDATE
router.put("/:id", async(req,res) => {        
                    try{
                            const updatedcategory = await Category.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                            res.status(200).json(updatedcategory);
                    }catch(err){
                        res.status(500).json(err);
                    } 
});

//DELETE
router.delete("/:id", async(req,res) => {
        try{
            const category = await Category.findById(req.params.id);
                try{
                    await category.detete();
                    res.status(200).json("category has been deleted");
                }catch(err){
                    res.status(500).json(err);
                } 
           
        } catch(err) {
            //renvoie message fail
            res.status(500).json(err)
        }
});

//GET
router.get("/", async(req,res) => {
    try{
            const category = await Category.find();
            res.status(200).json(category);
        }catch(err){
            res.status(500).json(err);
        }
});

module.exports = router;