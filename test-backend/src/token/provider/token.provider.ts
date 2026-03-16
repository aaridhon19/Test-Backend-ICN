import { JwtService } from "@nestjs/jwt";
import { TokenRepository } from "../repository/token.repository";
import { TokenSource } from "../source/token.source";

export const tokenProvider = {
        provide: TokenRepository,
        useFactory: (jwtService: JwtService) => new TokenSource(jwtService),
        inject: [JwtService]
};
