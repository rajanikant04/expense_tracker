'use client'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
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


function EditBudget({budgetInfo, refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState('😀');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon || '😀');
            setName(budgetInfo.name || '');
            setAmount(budgetInfo.amount || '');
        }
    }, [budgetInfo]);
    
    const onUpdateBudget = async() => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo?.id))
        .returning()

        if(result) {
            refreshData();
            toast.success("Budget get updated!");
        }
    }

    return (
    <div>
        <Dialog>
            <DialogTrigger asChild> 
            <Button ><PenBox />Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Update New Budget</DialogTitle>
                <DialogDescription>
                    <div className='mt-5'>
                    <Button variant={'outline'} className={'text-lg cursor-pointer'}
                    onClick={()=> setOpenEmojiPicker(!openEmojiPicker)}
                    >{emojiIcon || '😀'}</Button>
                    <div className='absolute z-50 mt-2'>
                        <EmojiPicker open={openEmojiPicker} onEmojiClick={(e)=> {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                        }}
                        />
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black font-medium my-1 '>Budget Name</h2> 
                        <Input value={name}
                        placeholder='e.g. Home Decor' 
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black font-medium my-1 '>Budget Amount</h2> 
                        <Input placeholder='e.g. 5000$'
                        type='number'
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        />
                    </div>
                    </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <Button 
                        onClick= {()=> onUpdateBudget()}
                        className={'mt-5 w-full'} 
                        disabled={!(name&&amount)} >
                        Update budget
                    </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditBudget