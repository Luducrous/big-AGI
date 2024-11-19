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
    id: 'simplepython',
    name: 'Simple Python',
    rank: 100,
    location: 'local',
    instanceLimit: 1,

    // Components
    Icon: () => null,
    SourceSetupComponent: SimplePythonSourceSetup,
    LLMOptionsComponent: OpenAILLMOptions,

    // Setup
    initializeSetup: () => ({
        oaiHost: 'http://localhost:5000',
    }),

    getTransportAccess: (partialSetup) => ({
        dialect: 'simplepython' as const,
        oaiKey: '',
        oaiOrg: '',
        oaiHost: partialSetup?.oaiHost || 'http://localhost:5000',
        heliKey: '',
        moderationCheck: false,
    }),

    // Reuse all OpenAI handlers with proper typing
    rpcUpdateModelsOrThrow: ModelVendorOpenAI.rpcUpdateModelsOrThrow,
    rpcChatGenerateOrThrow: ModelVendorOpenAI.rpcChatGenerateOrThrow,
    streamingChatGenerateOrThrow: ModelVendorOpenAI.streamingChatGenerateOrThrow,
};