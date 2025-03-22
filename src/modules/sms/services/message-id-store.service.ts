import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageIdStoreService {
  private readonly processedIds = new Set<string>();

  isProcessed(messageId: string): boolean {
    return this.processedIds.has(messageId);
  }

  markAsProcessed(messageId: string): void {
    this.processedIds.add(messageId);
  }
}
