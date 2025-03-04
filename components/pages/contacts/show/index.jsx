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

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { SessionContext } from "@inrupt/solid-ui-react";
import { schema } from "rdf-namespaces";
import {
  BackToNav,
  BackToNavLink,
  Container,
} from "@inrupt/prism-react-components";
import Profile from "../../../profile";
import useFullProfile from "../../../../src/hooks/useFullProfile";

export default function ContactShow() {
  const router = useRouter();
  const decodedIri = decodeURIComponent(router.query.webId);
  const { sessionRequestInProgress } = useContext(SessionContext);
  const agentProfile = useFullProfile(decodedIri);

  if (sessionRequestInProgress || !agentProfile) {
    return null;
  }

  const link = <BackToNavLink href="/contacts">contacts</BackToNavLink>;
  return (
    <>
      <Container>
        <BackToNav link={link} />
      </Container>
      <Profile profile={agentProfile} />
    </>
  );
}
