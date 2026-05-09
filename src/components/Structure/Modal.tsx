"use client"

import { useCallback, useState } from 'react';
import MuiModal from '@mui/material/Modal';

import { Eyebrow } from '~/components/Text/Eyebrow'
import { Heading } from '~/components/Text/Heading'
import { Subtitle } from '~/components/Text/Subtitle'
import { cn } from '~/lib/cn'
import { Button, CloseButton } from '../Button';

export const Modal = ({ ...props }: Props) => {
    const { id, btnText } = props;
    const [open, setOpen] = useState(false);

    function handleClose (){
        setOpen(false);
        // TODO: Use a ref to target this element
        setTimeout(() => {
            console.log(document.getElementById(`modal-${id}__open-btn`));
            document.getElementById(`modal-${id}__open-btn`)?.focus();
        }, 100)
    }

    return (
        <div>
            <Button
                id={`modal-${id}__open-btn`}
                onClick={() => setOpen(!open)}

            >{btnText || 'Open Modal'}</Button>
            <MuiModal
                open={open}
                onClose={handleClose}
                className="w-full h-full bg-background/50 m-0 p-0 flex justify-center items-center"
                id={`modal-${id}`}
            >
                <div
                    className="modal__body bg-background flex flex-col gap-6 size-9/10 flex-shrink-0 rounded-xl pt-0 pb-10 px-6"
                    id={`modal-${id}__body`}    
                >
                    <div className="modal__header flex w-full justify-between my-2 items-center">
                        <Heading className="h2 m-0">Heading</Heading>
                        <CloseButton onClick={handleClose} />
                    </div>/
                        {props.children}
                </div>
            </MuiModal>
        </div>
    )
}
