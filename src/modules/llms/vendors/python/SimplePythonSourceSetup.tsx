import * as React from 'react';

import { FormTextField } from '~/common/components/forms/FormTextField';
import { InlineError } from '~/common/components/InlineError';
import { SetupFormRefetchButton } from '~/common/components/forms/SetupFormRefetchButton';
import { useToggleableBoolean } from '~/common/util/useToggleableBoolean';

import { DModelSourceId } from '../../store-llms';
import { useLlmUpdateModels } from '../../llm.client.hooks';
import { useSourceSetup } from '../useSourceSetup';
import { ModelVendorSimplePython } from './simplepython.vendor';

export function SimplePythonSourceSetup(props: { sourceId: DModelSourceId }) {

    // state
    const advanced = useToggleableBoolean(false);

    // external state
    const { source, sourceHasLLMs, access, updateSetup } =
        useSourceSetup(props.sourceId, ModelVendorSimplePython);

    // derived state
    const { oaiHost } = access;

    // fetch models
    const { isFetching, refetch, isError, error } =
        useLlmUpdateModels(!sourceHasLLMs, source);

    return <>
        <FormTextField
            autoCompleteId='buddygpt-server'
            title='Server URL'
            placeholder='https://ef9e-86-83-122-8.ngrok-free.app'
            value={oaiHost}
            onChange={text => updateSetup({ oaiHost: text })}
        />

        <SetupFormRefetchButton
            refetch={refetch}
            disabled={isFetching}
            error={isError}
            loading={isFetching}
            advanced={advanced}
        />

        {isError && <InlineError error={error} />}
    </>;
}