/*
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
//asdda
 import { openDB } from 'idb';
 import { marked } from 'marked';
 import { wrap, proxy } from 'comlink';
 //yawa jud kaayo si anthony
 window.addEventListener('DOMContentLoaded', async () => {
   const preview = document.querySelector('.preview');
   const db = await openDB('settings-store');
   const content = (await db.get('settings', 'content')) || '';
   
   preview.innerHTML = marked(content);
 
   const workerURL = new URL('./worker.js', import.meta.url);
   const worker = new SharedWorker(workerURL);
   const compiler = wrap(worker.port);
 
   const updatePreview = proxy(async (data) => {
     preview.innerHTML = marked(data.compiled);
   });
 
   compiler.subscribe(updatePreview);
 });
 