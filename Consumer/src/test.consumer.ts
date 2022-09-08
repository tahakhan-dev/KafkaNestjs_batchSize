import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) { }

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'test-account' },
      {
        autoCommit: false,
        autoCommitThreshold: 1,
        eachBatchAutoResolve: true,
        partitionsConsumedConcurrently: 8,

        eachBatch: async ({ batch,
          resolveOffset,
          heartbeat,
          commitOffsetsIfNecessary, }) => {
          console.log('=================batch.messages=================');
          console.log(batch.messages);
          console.log('=================batch.messages=================');


          for (let message of batch.messages) {
            console.log({
              topic: batch.topic,
              partition: batch.partition,
              highWatermark: batch.highWatermark,
              message: {
                offset: message.offset,
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
              }
            })

            resolveOffset(message.offset)
            await heartbeat()
            await commitOffsetsIfNecessary();
          }

        },
      },
    );
  }
}
