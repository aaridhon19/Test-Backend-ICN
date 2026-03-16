import { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class CoreSecurity implements CanActivate {
        constructor(
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService
        ) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
                const request: Request = context.switchToHttp().getRequest();

                const token = this.extractTokenFromHeader(request);

                if (!token) {
                        throw new UnauthorizedException();
                }

                try {
                        const payload = await this.jwtService.verifyAsync(token, {
                                secret: this.configService.get<string>("ICN_JWT_SECRET"),
                        });

                        (request as any).user = payload;

                } catch (error) {
                        throw new UnauthorizedException();
                }

                return true;
        }

        private extractTokenFromHeader(request: Request): string | null {
                const [type, token] = request.headers.authorization?.split(" ") ?? [];
                return type === "Bearer" ? token : null;
        }
}