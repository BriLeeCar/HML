import type { FieldHook } from 'payload'

export const toUpperCase: FieldHook = ({ value }) => value?.toUpperCase() || null
