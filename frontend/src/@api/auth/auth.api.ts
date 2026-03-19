
type LoginVO = {
    uname: string,
    token: string

}
export const signInHttp = async (): Promise<LoginVO> => {
    return {
        uname: 'admin',
        token: 'admin'
    }
}