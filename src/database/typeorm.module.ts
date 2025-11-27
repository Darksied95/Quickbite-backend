import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const config = {
                    type: configService.get('DB_CLIENT'),
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [
                        __dirname + '/../**/*.entity{.ts,.js}',
                    ],
                    synchronize: true,
                    logging: true,
                    migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
                    migrationsRun: true,
                    cli: {
                        migrationsDir: __dirname + '/../database/migrations',
                    }
                };
                return config;
            },
            inject: [ConfigService],
        }),
    ]
})
export class TypeOrmDBModule { }