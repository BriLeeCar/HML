"use client"

import { useState } from 'react';
import MuiModal from '@mui/material/Modal';

import { Eyebrow } from '~/components/Text/Eyebrow'
import { Heading } from '~/components/Text/Heading'
import { Subtitle } from '~/components/Text/Subtitle'
import { cn } from '~/lib/cn'
import { Button, CloseButton } from '../Button';

export const Modal = ({ ...props }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button
                onClick={() => setOpen(!open)}
            >Open me</Button>
            <MuiModal open={open} className="w-full h-full bg-background/50 m-0 p-0 flex justify-center items-center">
                <div className="modal__body bg-background flex flex-col gap-6 size-9/10 flex-shrink-0 rounded-xl pt-0 pb-10 px-6">
                    <div className="modal__header flex w-full justify-between">
                        <Heading className="h2">Heading</Heading>
                        <CloseButton />
                    </div>/

                        {props.children}
                </div>
            </MuiModal>
        </div>
    )
}
