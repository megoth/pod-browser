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

import {
  GROUPS_PAGE_ENABLED,
  PRIVACY_PAGE_ENABLED_SERVER,
} from "../src/featureFlags";

export const TESTCAFE_ID_MAIN_MENU_FILES = "main-menu-files";
export const TESTCAFE_ID_MAIN_MENU_GROUPS = "main-menu-groups";
export const TESTCAFE_ID_MAIN_MENU_PRIVACY = "main-menu-privacy";
export const TESTCAFE_ID_MAIN_MENU_CONTACTS = "main-menu-contacts";
export const TESTCAFE_ID_MAIN_MENU_BOOKMARKS = "main-menu-bookmarks";

export default function getMainMenuItems() {
  return [
    {
      path: "/",
      label: "Files",
      icon: "files",
      pages: ["/resource/[iri]"],
      "data-testid": TESTCAFE_ID_MAIN_MENU_FILES,
    },
    {
      path: "/groups",
      label: "Groups",
      icon: "users",
      featureFlag: GROUPS_PAGE_ENABLED,
      pages: ["/groups", "/groups/[iri]"],
      "data-testid": TESTCAFE_ID_MAIN_MENU_GROUPS,
    },
    {
      path: "/privacy",
      label: "Privacy",
      icon: "user-shield",
      featureFlag: PRIVACY_PAGE_ENABLED_SERVER,
      pages: ["/privacy", "/privacy/access/requests/"],
      "data-testid": TESTCAFE_ID_MAIN_MENU_PRIVACY,
    },
    {
      path: "/contacts",
      label: "Contacts",
      icon: "address-book",
      pages: ["/contacts", "/contacts/add", "/contacts/[webId]"],
      "data-testid": TESTCAFE_ID_MAIN_MENU_CONTACTS,
    },
    {
      path: "/bookmarks",
      label: "Bookmarks",
      icon: "star",
      pages: ["/bookmarks"],
      "data-testid": TESTCAFE_ID_MAIN_MENU_BOOKMARKS,
    },
  ];
}
