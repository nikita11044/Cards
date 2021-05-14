export const errorHandler = (e: any) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
}

