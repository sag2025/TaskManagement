const gettaskService=require("../services/services.tasks.get");


async function get_task(req,res)
{

  try{
    const id=req.user.id;
    const result= await gettaskService(id);
    console.log(result);
    if(result)
    {
      return res.status(200).json({tasks:result});
    }
     return res.status(200).json({message:"no tasks till"});
  }
  catch(error)
  {
    console.log(error.message)
    res.status(500).json({message:"internal error"});
  }

}

module.exports=get_task;
    