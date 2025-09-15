export interface IToken {
    id: string,
    token: string
    user_id: string
    is_revoked: boolean
    expires_at: Date
    created_at: Date
    updated_at: Date
}