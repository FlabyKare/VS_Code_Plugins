/**
 * @author Code Snippets AI
 * https://github.com/stefanfmeyer/codesnippets.ai-extension
 *
 * @license
 * Copyright (c) 2023 - Present, Code Snippets AI
 *
 * All rights reserved. Code licensed under the GPL license
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

// @ts-nocheck
(function () {
    const vscode = acquireVsCodeApi();

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, _lang) {
            return hljs.highlightAuto(code).value;
        },
        langPrefix: 'hljs language-',
        pedantic: false,
        gfm: true,
        breaks: true,
        sanitize: false,
        smartypants: false,
        xhtml: false
    });

    const aiSvg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="18.000000pt" height="18.000000pt" viewBox="0 0 985.000000 985.000000"
    preserveAspectRatio="xMidYMid meet">
   <g transform="translate(0.000000,985.000000) scale(0.100000,-0.100000)"
   fill="currentColor" stroke="none">
   <path d="M4565 9830 c-1453 -117 -2729 -822 -3598 -1987 -487 -655 -811 -1455
   -916 -2263 -31 -236 -41 -401 -41 -659 0 -284 12 -467 46 -701 227 -1584 1215
   -2961 2644 -3688 1256 -638 2745 -704 4055 -180 624 250 1167 610 1650 1093
   512 511 888 1096 1138 1770 419 1127 402 2413 -45 3530 -504 1258 -1512 2261
   -2767 2754 -406 159 -806 259 -1251 312 -198 24 -721 34 -915 19z m-1292
   -1850 c109 -41 192 -128 237 -248 18 -46 21 -74 18 -143 -3 -75 -8 -94 -41
   -161 -148 -300 -576 -293 -716 11 -107 233 19 491 274 557 63 17 159 10 228
   -16z m1903 0 c76 -27 132 -60 185 -112 25 -24 201 -277 394 -563 192 -286 667
   -992 1055 -1570 388 -577 923 -1373 1189 -1767 265 -395 493 -743 507 -773 37
   -79 42 -174 16 -262 -47 -153 -166 -257 -323 -283 -84 -13 -1961 -14 -2043 0
   -83 13 -159 53 -218 114 -73 76 -1276 1866 -1299 1934 -77 223 66 469 299 517
   129 27 270 -15 358 -107 23 -24 154 -209 291 -413 137 -203 383 -569 547 -812
   l299 -443 480 0 479 0 -18 28 c-9 15 -199 297 -421 627 -223 330 -747 1110
   -1166 1732 -419 623 -765 1133 -769 1133 -6 0 -631 -926 -2243 -3325 -307
   -456 -576 -849 -599 -873 -50 -53 -141 -99 -221 -112 -168 -27 -343 66 -421
   225 -26 55 -29 69 -29 165 0 87 4 113 22 153 12 26 244 377 514 780 271 402
   815 1211 1209 1797 394 586 868 1291 1054 1567 233 347 351 515 384 544 133
   117 323 155 488 99z"/>
   </g>
   </svg>`;

    const userSvg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="14.000000pt" height="14.000000pt" viewBox="0 0 1280.000000 1231.000000"
    preserveAspectRatio="xMidYMid meet">
   <g transform="translate(0.000000,1231.000000) scale(0.100000,-0.100000)"
   fill="currentColor" stroke="none">
   <path d="M6130 12304 c-19 -2 -84 -9 -145 -15 -700 -67 -1430 -353 -2000 -783
   -233 -175 -534 -465 -707 -681 -709 -884 -1016 -1994 -857 -3100 136 -946 604
   -1817 1309 -2438 141 -124 340 -275 478 -365 l93 -60 -53 -12 c-142 -33 -472
   -125 -628 -176 -1667 -538 -2896 -1531 -3385 -2733 -150 -369 -235 -788 -235
   -1161 0 -105 33 -638 46 -737 l5 -43 6349 0 6349 0 5 43 c13 98 46 631 46 732
   0 316 -60 668 -167 980 -436 1276 -1666 2326 -3398 2900 -192 64 -561 170
   -665 190 -19 4 -41 10 -48 14 -7 4 41 43 130 104 376 254 691 554 960 912 97
   129 185 262 241 361 24 43 66 117 92 164 68 118 162 328 229 507 242 655 307
   1374 186 2078 -74 431 -242 900 -461 1289 -84 148 -249 391 -365 536 -138 173
   -441 476 -614 614 -140 112 -386 279 -525 358 -377 213 -789 368 -1210 453
   -250 51 -410 66 -725 70 -162 2 -311 1 -330 -1z"/>
   </g>
   </svg>`;

    const clipboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>`;

    const checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;

    const cancelSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;

    const sendSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>`;

    const pencilSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="2" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`;

    const plusSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;

    const insertSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>`;

    const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" data-license="isc-gnc" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" ><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

    const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;

    const refreshSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-license="isc-gnc" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>`;

    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
        const message = event.data;
        const list = document.getElementById("qa-list");

        switch (message.type) {
            case "showInProgress":
                if (message.showStopButton) {
                    document.getElementById("stop-button").classList.remove("hidden");
                } else {
                    document.getElementById("stop-button").classList.add("hidden");
                }

                if (message.inProgress) {
                    document.getElementById("in-progress").classList.remove("hidden");
                    document.getElementById("question-input").setAttribute("disabled", true);
                    document.getElementById("question-input-buttons").classList.add("hidden");
                } else {
                    document.getElementById("in-progress").classList.add("hidden");
                    document.getElementById("question-input").removeAttribute("disabled");
                    document.getElementById("question-input-buttons").classList.remove("hidden");
                }
                break;
            case "addQuestion":
                list.classList.remove("hidden");
                document.getElementById("introduction")?.classList?.add("hidden");
                document.getElementById("conversation-list").classList.add("hidden");

                const escapeHtml = (unsafe) => {
                    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
                };

                list.innerHTML +=
                    `<div class="p-4 self-end mt-4 question-element-ext relative input-background">
                        <h2 class="mb-5 flex" data-license="isc-gnc">${userSvg}<span class="ml-4 flex">You</span></h2>
                        <no-export class="mb-2 flex items-center" data-license="isc-gnc">
                            <button title="Edit and resend this prompt" class="resend-element-ext p-1.5 flex items-center rounded-lg absolute right-6 top-6">${pencilSvg}</button>
                            <div class="hidden send-cancel-elements-ext flex gap-2">
                                <button title="Send this prompt" class="send-element-ext p-1 pr-2 flex items-center">${sendSvg}&nbsp;Send</button>
                                <button title="Cancel" class="cancel-element-ext p-1 pr-2 flex items-center">${cancelSvg}&nbsp;Cancel</button>
                            </div>
                        </no-export>
                        <div class="overflow-y-auto">${escapeHtml(message.value)}</div>
                    </div>`;

                if (message.autoScroll) {
                    list.lastChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                }
                break;
            case "addResponse":
                let existingMessage = message.id && document.getElementById(message.id);
                let updatedValue = "";

                const unEscapeHtml = (unsafe) => {
                    return unsafe.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#039;', "'");
                };

                if (!message.responseInMarkdown) {
                    updatedValue = "```\r\n" + unEscapeHtml(message.value) + " \r\n ```";
                } else {
                    updatedValue = message.value.split("```").length % 2 === 1 ? message.value : message.value + "\n\n```\n\n";
                }

                const markedResponse = marked.parse(updatedValue);

                if (existingMessage) {
                    existingMessage.innerHTML = markedResponse;
                } else {
                    list.innerHTML +=
                        `<div data-license="isc-gnc" class="p-4 self-end mt-4 pb-8 answer-element-ext">
                        <h2 class="mb-5 ml-2 flex">${aiSvg}<span class="mb-5 ml-4 flex">Code Snippets AI</span></h2>
                        <div class="result-streaming" id="${message.id}">${markedResponse}</div>
                    </div>`;
                }

                if (message.done) {
                    const preCodeList = list.lastChild.querySelectorAll("pre > code");

                    preCodeList.forEach((preCode) => {
                        preCode.classList.add("input-background", "p-4", "pb-2", "block", "whitespace-pre", "overflow-x-scroll", "border", "border-purple-700", "rounded-md");
                        preCode.parentElement.classList.add("pre-code-element", "relative");

                        const buttonWrapper = document.createElement("no-export");
                        buttonWrapper.classList.add("code-actions-wrapper", "flex", "gap-3", "pr-2", "pt-1", "pb-1", "flex-wrap", "items-center", "justify-end", "rounded-t-lg", "input-background");

                        // Create copy to clipboard button
                        const copyButton = document.createElement("button");
                        copyButton.title = "Copy to clipboard";
                        copyButton.innerHTML = `Copy ${clipboardSvg}`;

                        copyButton.classList.add("code-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");

                        const insert = document.createElement("button");
                        insert.title = "Insert the below code to the current file";
                        insert.innerHTML = `${insertSvg} Insert`;

                        insert.classList.add("edit-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");

                        const newTab = document.createElement("button");
                        newTab.title = "Create a new file with the below code";
                        newTab.innerHTML = `${plusSvg} New`;

                        newTab.classList.add("new-code-element-ext", "p-1", "pr-2", "flex", "items-center", "rounded-lg");

                        buttonWrapper.append(copyButton, insert, newTab);
                        if (preCode.parentNode.previousSibling) {
                            preCode.parentNode.parentNode.insertBefore(buttonWrapper, preCode.parentNode.previousSibling);
                        } else {
                            preCode.parentNode.parentNode.prepend(buttonWrapper);
                        }
                    });

                    existingMessage = document.getElementById(message.id);
                    existingMessage.classList.remove("result-streaming");
                }

                if (message.autoScroll && (message.done || markedResponse.endsWith("\n"))) {
                    list.lastChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                }

                break;
            case "addError":
                if (!list.innerHTML) {
                    return;
                }

                const messageValue = message.value || "An error occurred. If this issue persists please clear your session token with `ChatGPT: Reset session` command and/or restart your Visual Studio Code. If you still experience issues, it may be due to outage on https://openai.com services.";

                list.innerHTML +=
                    `<div class="p-4 self-end mt-4 pb-8 error-element-ext" data-license="isc-gnc">
                    <h2 class="mb-5 ml-2 flex">${aiSvg}<span class="mb-5 ml-4 flex">Code Snippets AI</span></h2>
                        <div class="text-red-400">${marked.parse(messageValue)}</div>
                    </div>`;

                if (message.autoScroll) {
                    list.lastChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                }
                break;
            case "clearConversation":
                clearConversation();
                break;
            case "exportConversation":
                exportConversation();
                break;
            default:
                break;
        }
    });
    // const addFreeTextQuestion = () => {
    //     const input = document.getElementById("question-input");
    //     const editor = vscode.window.activeTextEditor;

    //     if (!editor) {
    //         return;
    //     }

    //     const selection = editor.document.getText(editor.selection);
    //     if (input.value?.length > 0) {
    //         vscode.postMessage({
    //             type: "addFreeTextQuestion",
    //             value: input.value + editor?.document.getText(editor.selection),
    //         });

    //         input.value = "";
    //     }
    // };
    // const addFreeTextQuestion = () => {
    //     const input = document.getElementById("question-input");
    //     const editor = vscode.window.activeTextEditor;

    //     if (!editor) {
    //         return;
    //     }
    //     // Get current selection from vscode editor
    //     const selection = editor.document.getText(editor.selection);
    //     const value = selection ? `${input.value} ${selection}` : input.value;

    //     if (value.length > 0) {
    //         vscode.postMessage({
    //             type: "addFreeTextQuestion",
    //             value,
    //         });

    //         input.value = "";
    //     }
    // };
    // const addFreeTextQuestion = () => {
    //     const input = document.getElementById("question-input");
    //     if (input.value?.length > 0) {
    //         const editor = vscode.window.activeTextEditor;
    //         // Get current selection from vscode editor
    //         const selection = editor.document.getText(editor.selection);
    //         const inputValue = selection ? `${input.value} ${selection}` : input.value;
    //         vscode.postMessage({
    //             type: "addFreeTextQuestion",
    //             value: inputValue,
    //         });

    //         inputValue = "";
    //     }
    // };
    const addFreeTextQuestion = () => {
        const input = document.getElementById("question-input");
        if (input.value?.length > 0) {
            vscode.postMessage({
                type: "addFreeTextQuestion",
                value: input.value,
            });

            input.value = "";
        }
    };

    const clearConversation = () => {
        document.getElementById("qa-list").innerHTML = "";

        document.getElementById("introduction")?.classList?.remove("hidden");

        vscode.postMessage({
            type: "clearConversation"
        });

    };

    // const exportConversation = () => {
    //     const turndownService = new TurndownService({ codeBlockStyle: "fenced" });
    //     turndownService.remove('no-export');
    //     let markdown = turndownService.turndown(document.getElementById("qa-list"));

    //     vscode.postMessage({
    //         type: "openNew",
    //         value: markdown,
    //         language: "markdown"
    //     });
    // };

    document.getElementById('question-input').addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
            event.preventDefault();
            addFreeTextQuestion();
        }
    });

    document.addEventListener("click", (e) => {
        const targetButton = e.target.closest('button');

        if (targetButton?.id === "more-button") {
            e.preventDefault();
            document.getElementById('chat-button-wrapper')?.classList.toggle("hidden");

            return;
        } else {
            document.getElementById('chat-button-wrapper')?.classList.add("hidden");
        }

        if (e.target?.id === "settings-button") {
            e.preventDefault();
            vscode.postMessage({
                type: "openSettings",
            });
            return;
        }

        if (e.target?.id === "settings-prompt-button") {
            e.preventDefault();
            vscode.postMessage({
                type: "openSettingsPrompt",
            });
            return;
        }

        if (targetButton?.id === "login-button") {
            e.preventDefault();
            vscode.postMessage({
                type: "login",
            });
            return;
        }

        if (targetButton?.id === "ask-button") {
            e.preventDefault();
            addFreeTextQuestion();
            return;
        }

        if (targetButton?.id === "clear-button") {
            e.preventDefault();
            clearConversation();
            return;
        }

        if (targetButton?.id === "export-button") {
            e.preventDefault();
            exportConversation();
            return;
        }

        if (targetButton?.id === "stop-button") {
            e.preventDefault();
            vscode.postMessage({
                type: "stopGenerating",
            });

            return;
        }

        if (targetButton?.classList?.contains("resend-element-ext")) {
            e.preventDefault();
            const question = targetButton.closest(".question-element-ext");
            const elements = targetButton.nextElementSibling;
            elements.classList.remove("hidden");
            question.lastElementChild?.setAttribute("contenteditable", true);

            targetButton.classList.add("hidden");

            return;
        }

        if (targetButton?.classList?.contains("send-element-ext")) {
            e.preventDefault();

            const question = targetButton.closest(".question-element-ext");
            const elements = targetButton.closest(".send-cancel-elements-ext");
            const resendElement = targetButton.parentElement.parentElement.firstElementChild;
            elements.classList.add("hidden");
            resendElement.classList.remove("hidden");
            question.lastElementChild?.setAttribute("contenteditable", false);

            if (question.lastElementChild.textContent?.length > 0) {
                vscode.postMessage({
                    type: "addFreeTextQuestion",
                    value: question.lastElementChild.textContent,
                });
            }
            return;
        }

        if (targetButton?.classList?.contains("cancel-element-ext")) {
            e.preventDefault();
            const question = targetButton.closest(".question-element-ext");
            const elements = targetButton.closest(".send-cancel-elements-ext");
            const resendElement = targetButton.parentElement.parentElement.firstElementChild;
            elements.classList.add("hidden");
            resendElement.classList.remove("hidden");
            question.lastElementChild?.setAttribute("contenteditable", false);
            return;
        }

        if (targetButton?.classList?.contains("code-element-ext")) {
            e.preventDefault();
            navigator.clipboard.writeText(targetButton.parentElement?.nextElementSibling?.lastChild?.textContent).then(() => {
                targetButton.innerHTML = `${checkSvg} Copied`;

                setTimeout(() => {
                    targetButton.innerHTML = `${clipboardSvg} Copy`;
                }, 1500);
            });

            return;
        }

        if (targetButton?.classList?.contains("edit-element-ext")) {
            e.preventDefault();
            vscode.postMessage({
                type: "editCode",
                value: targetButton.parentElement?.nextElementSibling?.lastChild?.textContent,
            });

            return;
        }

        if (targetButton?.classList?.contains("new-code-element-ext")) {
            e.preventDefault();
            vscode.postMessage({
                type: "openNew",
                value: targetButton.parentElement?.nextElementSibling?.lastChild?.textContent,
            });

            return;
        }
    });

})();
