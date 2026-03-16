import { TokenPayload } from "src/core/model/internal/token.payload.model";

export abstract class TokenRepository {
        abstract createAccessToken(payload: TokenPayload): Promise<string | null>;
}
