import { MessageTag, WSAutomationOutput } from 'ontime-types';
import { socket } from '../../../adapters/WebsocketAdapter.js';
import { RuntimeState } from '../../../stores/runtimeState.js';
import { parseTemplateNested } from '../automation.utils.js';

export function emitWSAutomation(output: WSAutomationOutput, state: RuntimeState) {
  const payload = preparePayload(output, state);
  socket.sendAsJson(MessageTag.Automation, payload);
}

function preparePayload(output: WSAutomationOutput, state: RuntimeState): Omit<WSAutomationOutput, 'type'> {
  return {
    name: parseTemplateNested(output.name, state),
    args: parseTemplateNested(output.args, state),
  };
}
