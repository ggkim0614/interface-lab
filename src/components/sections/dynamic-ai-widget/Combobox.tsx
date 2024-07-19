'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const models = [
  {
    value: 'GPT-4o',
    label: 'GPT-4o',
  },
  {
    value: 'GPT-4',
    label: 'GPT-4',
  },
  {
    value: 'GPT-3.5',
    label: 'GPT-3.5',
  },
]

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[32px] w-[160px] justify-between text-[12px] font-normal"
        >
          {value
            ? models.find((models) => models.value === value)?.label
            : 'GPT-4o'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." className="h-9" />
          <CommandEmpty>No models found.</CommandEmpty>
          <CommandGroup>
            {models.map((models) => (
              <CommandItem
                key={models.value}
                value={models.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                {models.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === models.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
