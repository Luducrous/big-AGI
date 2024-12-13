import { IModelVendor } from '../IModelVendor';
import { SimplePythonSourceSetup } from './SimplePythonSourceSetup';
import { OpenAILLMOptions } from '../openai/OpenAILLMOptions';
import { OpenAIAccessSchema } from '../../server/openai/openai.router';
import { LLMOptionsOpenAI, ModelVendorOpenAI } from '../openai/openai.vendor';

// Define the source setup type
export interface SourceSetupSimplePython {
    oaiHost: string;
}

export const ModelVendorSimplePython: IModelVendor<SourceSetupSimplePython, OpenAIAccessSchema, LLMOptionsOpenAI> = {
    id: 'zwiersai',
    name: 'Zwiers AI Assistant',
    rank: 1,
    location: 'local',
    instanceLimit: 1,

    // Components
    Icon: () => null,
    SourceSetupComponent: SimplePythonSourceSetup,
    LLMOptionsComponent: OpenAILLMOptions,

    // Setup
    initializeSetup: () => ({
        oaiHost: 'https://5ea8-2a02-a444-4e05-0-c858-825a-131f-acca.ngrok-free.app',
    }),

    getTransportAccess: (partialSetup) => ({
        dialect: 'zwiersai' as const,
        oaiKey: '',
        oaiOrg: '',
        oaiHost: partialSetup?.oaiHost || 'https://5ea8-2a02-a444-4e05-0-c858-825a-131f-acca.ngrok-free.app',
        heliKey: '',
        moderationCheck: false,
    }),

    // Reuse all OpenAI handlers with proper typing
    rpcUpdateModelsOrThrow: ModelVendorOpenAI.rpcUpdateModelsOrThrow,
    rpcChatGenerateOrThrow: ModelVendorOpenAI.rpcChatGenerateOrThrow,
    streamingChatGenerateOrThrow: ModelVendorOpenAI.streamingChatGenerateOrThrow,
};