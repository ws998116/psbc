import { TypedPocketBase } from '@/pocketbase-types';
import PocketBase from 'pocketbase';

const url = 'https://psbc.pockethost.io/'
const pb = new PocketBase(url) as TypedPocketBase

export default pb;