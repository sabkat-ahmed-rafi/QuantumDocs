import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
  } from "@heroui/react";

const MessageDrawer = ({isOpenMessage, onOpenMessageChange, document}) => {
  return (
    <>
        <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpenMessage}
        onOpenChange={onOpenMessageChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-black font-extrabold">Team Messages</DrawerHeader>
              <hr />
              <DrawerBody className='text-black'>
                {/* remote user message */}
                <div className='mb-1'>
                  <p className='bg-slate-500 text-white px-4 py-2 rounded-[15px] text-left rounded-bl-[0px] inline-block'>
                     Click the close button
                  </p>
                  <p className='text-sm text-slate-400 text-left'>12:30 - 30 september</p>
                </div>
                {/* local user message */}
                <div className='mb-1'>
                  <p className='bg-purple-500 text-white px-4 py-2 rounded-[15px] text-left rounded-br-[0px] inline-block'>
                     Click the close button or action button to close the drawer.
                  </p>
                  <p className='text-sm text-slate-400 text-right'>12:30 - 30 september</p>
                </div>
              </DrawerBody>
              <hr />
              <DrawerFooter className='flex-col'>
                <div className='mb-2'>
                  <Input className='text-black' variant="bordered" size='sm' label="message" type="text" />
                </div>
                <div className='flex justify-end space-x-3'>
                  <Button color="secondary" className='rounded-full'>
                    Send 
                  </Button>  
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MessageDrawer