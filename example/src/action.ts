
import { Action } from 'fluxx';
import { StateWithParams } from 'abyssa';


export const incrementBlue = Action('incrementBlue');

export const incrementRed = Action<number>('incrementRed');

export const routeChanged = Action<StateWithParams>('routeChanged');
