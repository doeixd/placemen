import Counter from "~/components/Counter";
import { Link } from "solid-app-router";
import { HopeProvider, Input, Text, FormLabel, FormControl, FormHelperText, Button, Alert, AlertIcon } from '@hope-ui/solid'
import { createClient } from '@supabase/supabase-js'

import {Show, createSignal} from 'solid-js'

const [show, setShow] = createSignal(false)

async function handleSubmit(e) {
  e.preventDefault();
  const supabase = getClient()
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  const { data ,error } = await supabase.from('accounts').insert({ username, password }) 
  if (!error?.message) {
    document.querySelector('#username').value = ''
    document.querySelector('#username').value = ''
    setShow(true)
    setTimeout(() => setShow(false), 5000)
  }
}

function getClient() {
  console.log(process.env)
  console.log(import.meta.env)
  return createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
}

function Home() {
  
  return (
    <main class='mx-auto text-gray-700 p-4 max-w-md'>
      <Show when={show()}>
        <Alert status='success' variant='subtle' css={{position: 'absolute'}}>
          <AlertIcon />
          Thanks for your support!
        </Alert>  
      </Show>
      <img
        src='https://styles.redditmedia.com/t5_2rwjm/styles/communityIcon_calot3djc4q51.png?width=256&s=4148f530919213df8b30bc8cbf34c445b74ec27b'
        alt='logo'
        class='w-20 mx-auto mt-2 mb-5'
      />
      <h1 class='text-center max-6-xs text-5xl text-sky-700 font-thin uppercase'>
        Placemen
      </h1>
      <h1 class='text-center text-3xl text-sky-700 font-thin uppercase'>
        Drum & Pixel Corps
      </h1>
      <p class='text-center text-xl my-4 text-red-700'>Time is running out!</p>
      <p class='my-5 text-left'>
        We need to use a bot if we want to immortalize the drum corps community.
      </p>
      <p class='my-5 text-left'>
        For the bot to work, we need your reddit login.
      </p>
      <p class='my-5 text-left mb-10'>
        We will delete the info after r/place is finalized. We also recommend
        you change your password afterwards.
      </p>
      <form onSubmit={async e => await handleSubmit(e)}>
        <FormControl required>
          <FormLabel for='username' class='text-thin'>
            Reddit Username
          </FormLabel>
          <Input id='username' type='username' name='username' />
        </FormControl>
        <FormControl required>
          <FormLabel for='password' class='mt-5'>
            Reddit Password
          </FormLabel>
          <Input id='password' type='password' name='password' />
          <FormHelperText>We'll never share your password</FormHelperText>
        </FormControl>
        <Button
          variant='solid'
          type='submit'
          class='bg-sky-700 hover:scale-105 mt-6 transition-all float-right'
          w='100%'
          bgColor='#0369a1'>
          Submit
        </Button>
      </form>
    </main>
  )
}
// 1. import `HopeProvider` component

// 2. Wrap HopeProvider at the root of your app
export default function App() {
  return (
    <HopeProvider>
      <Home />
    </HopeProvider>
  )
}