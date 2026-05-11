'use client'

import { useState } from 'react';
import Markdown from 'react-markdown'
import { redirect, RedirectType } from 'next/navigation'

import { Modal } from "~/components/Structure/Modal";
import { Button } from '~/components/Button';
import { triagePages, type Branch } from '../_lib/Triage';
import './TriageStyles.css'

export function TriageModal() {
    const [branch, setBranch] = useState('intro');

    const branchContent: Branch = triagePages[branch];

    if(branchContent.redirect) {
        redirect(branchContent.redirect, 'push' as RedirectType)
    }

    return (<Modal
        id="onsite-triage"
        btnText="triage"
    >
        {branchContent.body && (
            <Markdown>{branchContent.body}</Markdown>
        )}
        {branchContent.choices && (
            <div className="flex gap-3">
                {branchContent.choices.map((choice) => (
                    <Button
                        onClick={() => setBranch(choice.next)}
                    >
                        {choice.text}
                    </Button>
                ))}
            </div>
        )}
    </Modal>)
}