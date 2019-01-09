const _goBack = navigation => () => navigation.goBack()

const _onScreen = (screen, obj, navigation) => () => navigation.navigate(screen, obj)

export { _goBack, _onScreen }
