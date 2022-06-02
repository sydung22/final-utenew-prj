export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!process.server && !store.state.isUser) return redirect('/loginPage')
}
