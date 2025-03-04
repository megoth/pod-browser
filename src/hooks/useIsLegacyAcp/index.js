/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import useSWR from "swr";
import { acp_v3 as acp } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";

import { hasAcpConfiguration } from "../../accessControl/acp/helpers/index";

export default function useIsLegacyAcp(resourceInfo) {
  const { fetch } = useSession();
  return useSWR(
    [resourceInfo ? acp.getLinkedAcrUrl(resourceInfo) : null, fetch],
    // A legacy ACP server is one which does _not_ implement the ACP configuration discovery.
    // Since we mock SWR, the following line never runs.
    /* istanbul ignore next */
    async (acrUlr) => !(await hasAcpConfiguration(acrUlr, fetch))
  );
}
