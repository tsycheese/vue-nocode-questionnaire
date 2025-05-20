import type { EventBus } from '@/types/eventBus.ts';
import mitt from 'mitt';

const mitter = mitt<EventBus>();

export default mitter;
