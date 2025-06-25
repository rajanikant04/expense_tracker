'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

function CreateBudget({refreshData}) {

  const {user} = useUser();
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const onCreateBudget = async()=> {
    const result = await db.insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon
      }).returning({insertedId: Budgets.id});
      
    if(result) {
      refreshData();
      toast.success("New budget created!");
    }
  }

  return (
    <div>
        
        <Dialog>
        <DialogTrigger asChild> 
          <div className='bg-slate-100 p-10 rounded-md border-2 items-center flex flex-col border-dashed cursor-pointer hover:shadow-md'>
              <h2 className='text-3xl'>+</h2>
              <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button variant={'outline'} className={'text-lg'}
                onClick={()=> setOpenEmojiPicker(!openEmojiPicker)}
                >{emojiIcon}</Button>
                <div className='absolute z-50 mt-2'>
                  <EmojiPicker open={openEmojiPicker} onEmojiClick={(e)=> {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                    }}
                   />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1 '>Budget Name</h2> 
                  <Input placeholder='e.g. Home Decor' 
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1 '>Budget Amount</h2> 
                  <Input 
                    type='number'
                    placeholder='e.g. 5000$' 
                    onChange={(e)=>setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button 
                  onClick= {()=> onCreateBudget()}
                  className={'mt-5 w-full'} 
                  disabled={!(name&&amount)} >
                    Create budget
                </Button>
              </DialogClose>
          </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>

    // we can ignore asChild in button, but not in div case
    // By using asChild on DialogClose, you're telling it: "Don't render your own close button. Instead, take the <Button> component that's nested inside me and make it the close button."
  )
}

export default CreateBudget