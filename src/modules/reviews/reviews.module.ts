import { Module } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controlller';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
