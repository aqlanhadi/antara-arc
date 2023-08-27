"use client"

import React from 'react'
import Image from 'next/image'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function MasonryFeed({ content }: { content: any[]}) {

    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
    const [dialogContent, setDialogContent] = React.useState<any>(null)

    const viewContent = (item: any) => {
        console.log(item)
        setDialogContent(item)
        setDialogOpen(true)
    }

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                { dialogContent && <DialogContent className=''>
                    {/* <DialogHeader>
                    <DialogTitle>{dialogContent.src}</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader> */}
                    <Image
                        src={dialogContent.src}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className='rounded-3xl hover'
                    />
                    <div className='flex-col gap-3'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 border rounded-full' />
                            <div className='flex-col'>
                                <p className='font-semibold'>Abby & Gail</p>
                                <p className='text-xs'>Married Aug 2022</p>
                            </div>
                        </div>
                        <div className='flex gap-1.5 mt-3'>
                            {
                                Array(5).fill(0).map((_, index) => (
                                    <p key={index} className='px-2 py-0.5 text-xs border rounded-full'>Tag {index}</p>
                                ))
                            }
                        </div>
                    </div>
                </DialogContent>}
            </Dialog>
            
            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                <Masonry>
                    {
                        content.map((item, index) => (
                            <div key={index} className={`flex-col items-center w-auto h-auto m-1 mb-2.5`} onClick={() => viewContent(item)}>
                                <div className={`flex-col rounded-3xl ${item.promoted && 'bg-pink-100'}`}>
                                    { item.promoted && <p className='pt-3 pl-4 pb-2'>Promoted</p> }
                                    <Image
                                        key={index}
                                        src={item.src}
                                        alt="Picture of the author"
                                        width={500}
                                        height={500}
                                        className={`rounded-3xl hover`}
                                    />
                                    <div className={`flex items-center gap-3 ${ item.promoted ? 'p-3' : 'py-3'}`}>
                                        <div className='w-7 h-7 bg-slate-200 rounded-full' />
                                        <p className='font-semibold'>Abby & Gail</p>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </Masonry>
            </ResponsiveMasonry>
        </>
    )
}

function ContentDialog({ content }: { content: any }) {
    
}

export default MasonryFeed