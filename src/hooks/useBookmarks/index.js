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

import { useState, useContext, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import AlertContext from "../../contexts/alertContext";
import useAuthenticatedProfile from "../useAuthenticatedProfile";
import { joinPath } from "../../stringHelpers";
import { getResource } from "../../solidClientHelpers/resource";
import { initializeBookmarks } from "../../solidClientHelpers/bookmarks";
import { ERROR_CODES, isHTTPError } from "../../error";

const BOOKMARKS_PATH = "bookmarks/index.ttl";

export default function useBookmarks() {
  const profile = useAuthenticatedProfile();
  const { session } = useSession();
  const { setMessage, setAlertOpen, setSeverity } = useContext(AlertContext);
  const [bookmarks, setBookmarks] = useState();
  const [updatedBookmarks, setUpdatedBookmarks] = useState();
  const { fetch } = session;

  useEffect(() => {
    const pod = profile?.pods[0];
    if (!session.info.isLoggedIn || !profile || !pod) return;

    const bookmarksIri = joinPath(pod, BOOKMARKS_PATH);
    (async () => {
      try {
        const { response: existingBookmarks, error } = await getResource(
          bookmarksIri,
          fetch
        );
        if (error && isHTTPError(error, ERROR_CODES.NOT_FOUND)) {
          const newBookmarks = await initializeBookmarks(bookmarksIri, fetch);
          setBookmarks(newBookmarks);
        } else {
          setBookmarks(existingBookmarks);
        }
      } catch (error) {
        setBookmarks([]);
        setSeverity("error");
        setMessage(error);
        setAlertOpen(true);
      }
    })();
  }, [
    profile,
    fetch,
    setBookmarks,
    updatedBookmarks,
    setAlertOpen,
    setMessage,
    setSeverity,
    session,
  ]);
  return [bookmarks, setUpdatedBookmarks];
}
