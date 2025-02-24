import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
    Avatar
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
                  <div className='flex items-end space-x-2'>
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <p className='bg-slate-500 text-white px-4 py-2 rounded-[15px] text-left rounded-bl-[0px] inline-block w-[200px]'>
                       Click the close button dfghssss rtqewrgv 34r tgfqwrfv q4r tqrt qwe twer qwerqw console.error( rwe qwer qwtasdf);
                       
                    </p>
                  </div>
                  <p className='text-sm text-slate-400 text-left ml-11'>12:30 - 30 september</p>
                </div>
                {/* local user message */}
                <div className='mb-1'>
                  <div className='flex justify-end items-end space-x-2'>
                    <p className='bg-purple-500 text-white px-4 py-2 rounded-[15px] text-left rounded-br-[0px] inline-block w-[200px]'>
                       Click
                    </p>
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  </div>
                  <p className='text-sm text-slate-400 text-right mr-11'>12:30 - 30 september</p>
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