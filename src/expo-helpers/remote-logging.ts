// import Constants from 'expo-constants'
// import { EventEmitter, EventSubscription } from 'fbemitter'
// import invariant from 'invariant'
// import { v4 as uuidv4 } from 'uuid'

// import getInstallationIdAsync from '../environment/getInstallationIdAsync'
// import LogSerialization from './LogSerialization'

// export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// type LogEntry = {
//     count: number
//     level: LogLevel
//     body: LogData[]
//     includesStack: boolean
//     groupDepth?: number
// } & LogEntryFields

// export type LogEntryFields = {
//     shouldHide?: boolean
//     groupDepth?: number
//     groupCollapsed?: boolean
// }

// export type LogData = string | LogErrorData
// export type LogErrorData = { message: string; stack: string }

// //type TransportErrorListener = (event: { error: Error; response?: Response }) => void

// //const _sessionId = uuidv4()
// const _logQueue: LogEntry[] = []
// //const _transportEventEmitter = new EventEmitter()

// let _logCounter = 0
// //let _isSendingLogs = false
// //let _completionPromise: Promise<void> | null = null
// //let _resolveCompletion: (() => void) | null = null

// export async function enqueueRemoteLogAsync(
//     level: LogLevel,
//     additionalFields: LogEntryFields,
//     data: unknown[]
// ): Promise<void> {
//     if (_isReactNativeWarning(data)) {
//         // Remove the stack trace from the warning message since we'll capture our own
//         if (data.length === 0) {
//             throw new Error(`Warnings must include log arguments`)
//         }
//         const warning = data[0]
//         if (typeof warning !== 'string') {
//             throw new TypeError(`The log argument for a warning must be a string`)
//         }
//         const lines = warning.split('\n')
//         if (lines.length > 1 && /^\s+in /.test(lines[1])) {
//             data[0] = lines[0]
//         }
//     }

//     const { body, includesStack } = await LogSerialization.serializeLogDataAsync(data, level)

//     _logQueue.push({
//         count: _logCounter++,
//         level,
//         body,
//         includesStack,
//         ...additionalFields
//     })

//     // Send the logs asynchronously (system errors are emitted with transport error events) and throw an uncaught error
//     _sendRemoteLogsAsync().catch((error) => {
//         setImmediate(() => {
//             throw error
//         })
//     })
// }
