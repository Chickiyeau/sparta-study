import { EventEmitter } from '../EventEmitter';
import Platform from '../Platform';
import NativeErrorManager from './NativeErrorManager';

if (__DEV__ && Platform.OS === 'android' && NativeErrorManager) {
  const onNewException = 'ExpoModulesCoreErrorManager.onNewException';
  const eventEmitter = new EventEmitter(NativeErrorManager);

  eventEmitter.addListener(onNewException, ({ message }: { message: string }) => {
    console.error(message);
  });
}
