import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { instanceToPlain } from "class-transformer";
import { TokenPayload } from "src/core/model/internal/token.payload.model";
import { TokenRepository } from "../repository/token.repository";

@Injectable()
export class TokenSource extends TokenRepository {
        constructor(private readonly jwtService: JwtService) {
                super();
        }

        async createAccessToken(payload: TokenPayload): Promise<string | null> {
                return this.jwtService.signAsync(instanceToPlain(payload));
        }
}
