import { __extends as t, __awaiter as e, __generator as n, __spreadArray as r } from "tslib";

import { SDK_VERSION as i, _registerComponent as o, registerVersion as u, _getProvider, getApp as s, _removeServiceInstance as a } from "@firebase/app";

import { Component as c } from "@firebase/component";

import { Logger as l, LogLevel as h } from "@firebase/logger";

import { FirebaseError as f, getUA as d, isSafari as p, isMobileCordova as v, isReactNative as y, isElectron as m, isIE as g, isUWP as w, isBrowserExtension as b, getModularInstance as I, createMockUserToken as E, deepEqual as T, isIndexedDBAvailable as S } from "@firebase/util";

import { XhrIo as D, EventType as _, ErrorCode as x, createWebChannelTransport as N, getStatEventTarget as A, FetchXmlHttpFactory as k, WebChannel as C, Event as V, Stat as O } from "@firebase/webchannel-wrapper";

var M = "@firebase/firestore", R = /** @class */ function() {
    function t(t) {
        this.uid = t;
    }
    return t.prototype.isAuthenticated = function() {
        return null != this.uid;
    }, 
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    t.prototype.toKey = function() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }, t.prototype.isEqual = function(t) {
        return t.uid === this.uid;
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
/** A user with a null UID. */ R.UNAUTHENTICATED = new R(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
R.GOOGLE_CREDENTIALS = new R("google-credentials-uid"), R.FIRST_PARTY = new R("first-party-uid"), 
R.MOCK_USER = new R("mock-user");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var L = "9.8.3", F = new l("@firebase/firestore");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Helper methods are needed because variables can't be exported as read/write
function P() {
    return F.logLevel;
}

/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */ function q(t) {
    F.setLogLevel(t);
}

function U(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (F.logLevel <= h.DEBUG) {
        var i = e.map(G);
        F.debug.apply(F, r([ "Firestore (" + L + "): " + t ], i));
    }
}

function B(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (F.logLevel <= h.ERROR) {
        var i = e.map(G);
        F.error.apply(F, r([ "Firestore (" + L + "): " + t ], i));
    }
}

/**
 * @internal
 */ function K(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (F.logLevel <= h.WARN) {
        var i = e.map(G);
        F.warn.apply(F, r([ "Firestore (" + L + "): " + t ], i));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function G(t) {
    if ("string" == typeof t) return t;
    try {
        return e = t, JSON.stringify(e);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /** Formats an object as a JSON string, suitable for logging. */    var e;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function j(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (" + L + ") INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw B(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function z(t, e) {
    t || j();
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * The code of callsites invoking this function are stripped out in production
 * builds. Any side-effects of code within the debugAssert() invocation will not
 * happen in this case.
 *
 * @internal
 */ function Q(t, e) {
    t || j();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function W(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var H = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
}, Y = /** @class */ function(e) {
    /** @hideconstructor */
    function n(
    /**
     * The backend error code associated with this error.
     */
    t, 
    /**
     * A custom error description.
     */
    n) {
        var r = this;
        return (r = e.call(this, t, n) || this).code = t, r.message = n, 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        r.toString = function() {
            return r.name + ": [code=" + r.code + "]: " + r.message;
        }, r;
    }
    return t(n, e), n;
}(f), J = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, X = function(t, e) {
    this.user = e, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", "Bearer " + t);
}, $ = /** @class */ function() {
    function t() {}
    return t.prototype.getToken = function() {
        return Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {}, t.prototype.start = function(t, e) {
        // Fire with initial user.
        t.enqueueRetryable((function() {
            return e(R.UNAUTHENTICATED);
        }));
    }, t.prototype.shutdown = function() {}, t;
}(), Z = /** @class */ function() {
    function t(t) {
        this.token = t, 
        /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
        this.changeListener = null;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(this.token);
    }, t.prototype.invalidateToken = function() {}, t.prototype.start = function(t, e) {
        var n = this;
        this.changeListener = e, 
        // Fire with initial user.
        t.enqueueRetryable((function() {
            return e(n.token.user);
        }));
    }, t.prototype.shutdown = function() {
        this.changeListener = null;
    }, t;
}(), tt = /** @class */ function() {
    function t(t) {
        this.t = t, 
        /** Tracks the current User. */
        this.currentUser = R.UNAUTHENTICATED, 
        /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
        this.i = 0, this.forceRefresh = !1, this.auth = null;
    }
    return t.prototype.start = function(t, r) {
        var i = this, o = this.i, u = function(t) {
            return i.i !== o ? (o = i.i, r(t)) : Promise.resolve();
        }, s = new J;
        this.o = function() {
            i.i++, i.currentUser = i.u(), s.resolve(), s = new J, t.enqueueRetryable((function() {
                return u(i.currentUser);
            }));
        };
        var a = function() {
            var r = s;
            t.enqueueRetryable((function() {
                return e(i, void 0, void 0, (function() {
                    return n(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            return [ 4 /*yield*/ , r.promise ];

                          case 1:
                            return t.sent(), [ 4 /*yield*/ , u(this.currentUser) ];

                          case 2:
                            return t.sent(), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        }, c = function(t) {
            U("FirebaseAuthCredentialsProvider", "Auth detected"), i.auth = t, i.auth.addAuthTokenListener(i.o), 
            a();
        };
        this.t.onInit((function(t) {
            return c(t);
        })), 
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout((function() {
            if (!i.auth) {
                var t = i.t.getImmediate({
                    optional: !0
                });
                t ? c(t) : (
                // If auth is still not available, proceed with `null` user
                U("FirebaseAuthCredentialsProvider", "Auth not yet detected"), s.resolve(), s = new J);
            }
        }), 0), a();
    }, t.prototype.getToken = function() {
        var t = this, e = this.i, n = this.forceRefresh;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((function(n) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            return t.i !== e ? (U("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), 
            t.getToken()) : n ? (z("string" == typeof n.accessToken), new X(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {
        this.forceRefresh = !0;
    }, t.prototype.shutdown = function() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
    }, 
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t.prototype.u = function() {
        var t = this.auth && this.auth.getUid();
        return z(null === t || "string" == typeof t), new R(t);
    }, t;
}(), et = function(t, e, n) {
    this.type = "FirstParty", this.user = R.FIRST_PARTY, this.headers = new Map, this.headers.set("X-Goog-AuthUser", e);
    var r = t.auth.getAuthHeaderValueForFirstParty([]);
    r && this.headers.set("Authorization", r), n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
}, nt = /** @class */ function() {
    function t(t, e, n) {
        this.h = t, this.l = e, this.m = n;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new et(this.h, this.l, this.m));
    }, t.prototype.start = function(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((function() {
            return e(R.FIRST_PARTY);
        }));
    }, t.prototype.shutdown = function() {}, t.prototype.invalidateToken = function() {}, 
    t;
}(), rt = function(t) {
    this.value = t, this.type = "AppCheck", this.headers = new Map, t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
}, it = /** @class */ function() {
    function t(t) {
        this.g = t, this.forceRefresh = !1, this.appCheck = null, this.p = null;
    }
    return t.prototype.start = function(t, e) {
        var n = this, r = function(t) {
            null != t.error && U("FirebaseAppCheckTokenProvider", "Error getting App Check token; using placeholder token instead. Error: " + t.error.message);
            var r = t.token !== n.p;
            return n.p = t.token, U("FirebaseAppCheckTokenProvider", "Received " + (r ? "new" : "existing") + " token."), 
            r ? e(t.token) : Promise.resolve();
        };
        this.o = function(e) {
            t.enqueueRetryable((function() {
                return r(e);
            }));
        };
        var i = function(t) {
            U("FirebaseAppCheckTokenProvider", "AppCheck detected"), n.appCheck = t, n.appCheck.addTokenListener(n.o);
        };
        this.g.onInit((function(t) {
            return i(t);
        })), 
        // Our users can initialize AppCheck after Firestore, so we give it
        // a chance to register itself with the component framework.
        setTimeout((function() {
            if (!n.appCheck) {
                var t = n.g.getImmediate({
                    optional: !0
                });
                t ? i(t) : 
                // If AppCheck is still not available, proceed without it.
                U("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
            }
        }), 0);
    }, t.prototype.getToken = function() {
        var t = this, e = this.forceRefresh;
        return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then((function(e) {
            return e ? (z("string" == typeof e.token), t.p = e.token, new rt(e.token)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {
        this.forceRefresh = !0;
    }, t.prototype.shutdown = function() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
    }, t;
}(), ot = /** @class */ function() {
    function t() {}
    return t.prototype.getToken = function() {
        return Promise.resolve(new rt(""));
    }, t.prototype.invalidateToken = function() {}, t.prototype.start = function(t, e) {}, 
    t.prototype.shutdown = function() {}, t;
}();

/** An error returned by a Firestore operation. */
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */
function ut(t) {
    // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
    var e = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
    // Falls back to Math.random
    for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
    return n;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var st = /** @class */ function() {
    function t() {}
    return t.I = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = ut(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function at(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function ct(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function lt(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */ var ht = /** @class */ function() {
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    function t(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    t, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new Y(H.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new Y(H.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new Y(H.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new Y(H.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */    return t.now = function() {
        return t.fromMillis(Date.now());
    }, 
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    t.fromDate = function(e) {
        return t.fromMillis(e.getTime());
    }, 
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    t.fromMillis = function(e) {
        var n = Math.floor(e / 1e3);
        return new t(n, Math.floor(1e6 * (e - 1e3 * n)));
    }, 
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    t.prototype.toDate = function() {
        return new Date(this.toMillis());
    }, 
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    t.prototype.toMillis = function() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }, t.prototype._compareTo = function(t) {
        return this.seconds === t.seconds ? at(this.nanoseconds, t.nanoseconds) : at(this.seconds, t.seconds);
    }, 
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }, 
    /** Returns a textual representation of this `Timestamp`. */ t.prototype.toString = function() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }, 
    /** Returns a JSON-serializable representation of this `Timestamp`. */ t.prototype.toJSON = function() {
        return {
            seconds: this.seconds,
            nanoseconds: this.nanoseconds
        };
    }, 
    /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    t.prototype.valueOf = function() {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        var t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }, t;
}(), ft = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.fromTimestamp = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new ht(0, 0));
    }, t.max = function() {
        return new t(new ht(253402300799, 999999999));
    }, t.prototype.compareTo = function(t) {
        return this.timestamp._compareTo(t.timestamp);
    }, t.prototype.isEqual = function(t) {
        return this.timestamp.isEqual(t.timestamp);
    }, 
    /** Returns a number representation of the version for use in spec tests. */ t.prototype.toMicroseconds = function() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t.prototype.toString = function() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t.prototype.toTimestamp = function() {
        return this.timestamp;
    }, t;
}(), dt = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && j(), void 0 === n ? n = t.length - e : n > t.length - e && j(), 
        this.segments = t, this.offset = e, this.len = n;
    }
    return Object.defineProperty(t.prototype, "length", {
        get: function() {
            return this.len;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return 0 === t.comparator(this, e);
    }, t.prototype.child = function(e) {
        var n = this.segments.slice(this.offset, this.limit());
        return e instanceof t ? e.forEach((function(t) {
            n.push(t);
        })) : n.push(e), this.construct(n);
    }, 
    /** The index of one past the last segment of the path. */ t.prototype.limit = function() {
        return this.offset + this.length;
    }, t.prototype.popFirst = function(t) {
        return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
    }, t.prototype.popLast = function() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }, t.prototype.firstSegment = function() {
        return this.segments[this.offset];
    }, t.prototype.lastSegment = function() {
        return this.get(this.length - 1);
    }, t.prototype.get = function(t) {
        return this.segments[this.offset + t];
    }, t.prototype.isEmpty = function() {
        return 0 === this.length;
    }, t.prototype.isPrefixOf = function(t) {
        if (t.length < this.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.isImmediateParentOf = function(t) {
        if (this.length + 1 !== t.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.forEach = function(t) {
        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }, t.prototype.toArray = function() {
        return this.segments.slice(this.offset, this.limit());
    }, t.comparator = function(t, e) {
        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
            var i = t.get(r), o = e.get(r);
            if (i < o) return -1;
            if (i > o) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }, t;
}(), pt = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.construct = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype.canonicalString = function() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join("/");
    }, n.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    n.fromString = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
                for (var r = [], i = 0, o = t; i < o.length; i++) {
            var u = o[i];
            if (u.indexOf("//") >= 0) throw new Y(H.INVALID_ARGUMENT, "Invalid segment (" + u + "). Paths must not contain // in them.");
            // Strip leading and traling slashed.
                        r.push.apply(r, u.split("/").filter((function(t) {
                return t.length > 0;
            })));
        }
        return new n(r);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(dt), vt = /^[_a-zA-Z][_a-zA-Z0-9]*$/, yt = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.construct = function(t, e, r) {
        return new n(t, e, r);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.isValidIdentifier = function(t) {
        return vt.test(t);
    }, n.prototype.canonicalString = function() {
        return this.toArray().map((function(t) {
            return t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), n.isValidIdentifier(t) || (t = "`" + t + "`"), 
            t;
        })).join(".");
    }, n.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Returns true if this field references the key of a document.
     */
    n.prototype.isKeyField = function() {
        return 1 === this.length && "__name__" === this.get(0);
    }, 
    /**
     * The field designating the key of a document.
     */
    n.keyField = function() {
        return new n([ "__name__" ]);
    }, 
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    n.fromServerFormat = function(t) {
        for (var e = [], r = "", i = 0, o = function() {
            if (0 === r.length) throw new Y(H.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, u = !1; i < t.length; ) {
            var s = t[i];
            if ("\\" === s) {
                if (i + 1 === t.length) throw new Y(H.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new Y(H.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === s ? (u = !u, i++) : "." !== s || u ? (r += s, i++) : (o(), i++);
        }
        if (o(), u) throw new Y(H.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(dt), mt = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.fromPath = function(e) {
        return new t(pt.fromString(e));
    }, t.fromName = function(e) {
        return new t(pt.fromString(e).popFirst(5));
    }, t.empty = function() {
        return new t(pt.emptyPath());
    }, Object.defineProperty(t.prototype, "collectionGroup", {
        get: function() {
            return this.path.popLast().lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.hasCollectionId = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, 
    /** Returns the collection group (i.e. the name of the parent collection) for this key. */ t.prototype.getCollectionGroup = function() {
        return this.path.get(this.path.length - 2);
    }, 
    /** Returns the fully qualified path to the parent collection. */ t.prototype.getCollectionPath = function() {
        return this.path.popLast();
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === pt.comparator(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.comparator = function(t, e) {
        return pt.comparator(t.path, e.path);
    }, t.isDocumentKey = function(t) {
        return t.length % 2 == 0;
    }, 
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    t.fromSegments = function(e) {
        return new t(new pt(e.slice()));
    }, t;
}(), gt = function(
/**
     * The index ID. Returns -1 if the index ID is not available (e.g. the index
     * has not yet been persisted).
     */
t, 
/** The collection ID this index applies to. */
e, 
/** The field segments for this index. */
n, 
/** Shows how up-to-date the index is for the current user. */
r) {
    this.indexId = t, this.collectionGroup = e, this.fields = n, this.indexState = r;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */
/** An ID for an index that has not yet been added to persistence.  */
/** Returns the ArrayContains/ArrayContainsAny segment for this index. */
function wt(t) {
    return t.fields.find((function(t) {
        return 2 /* CONTAINS */ === t.kind;
    }));
}

/** Returns all directional (ascending/descending) segments for this index. */ function bt(t) {
    return t.fields.filter((function(t) {
        return 2 /* CONTAINS */ !== t.kind;
    }));
}

/**
 * Returns the order of the document key component for the given index.
 *
 * PORTING NOTE: This is only used in the Web IndexedDb implementation.
 */ gt.UNKNOWN_ID = -1;

/** An index component consisting of field path and index type.  */
var It = function(
/** The field path of the component. */
t, 
/** The fields sorting order. */
e) {
    this.fieldPath = t, this.kind = e;
}, Et = /** @class */ function() {
    function t(
    /**
     * Indicates when the index was last updated (relative to other indexes).
     */
    t, 
    /** The the latest indexed read time, document and batch id. */
    e) {
        this.sequenceNumber = t, this.offset = e
        /** The state of an index that has not yet been backfilled. */;
    }
    return t.empty = function() {
        return new t(0, Dt.min());
    }, t;
}();

/**
 * Stores the "high water mark" that indicates how updated the Index is for the
 * current user.
 */
/**
 * Creates an offset that matches all documents with a read time higher than
 * `readTime`.
 */
function Tt(t, e) {
    // We want to create an offset that matches all documents with a read time
    // greater than the provided read time. To do so, we technically need to
    // create an offset for `(readTime, MAX_DOCUMENT_KEY)`. While we could use
    // Unicode codepoints to generate MAX_DOCUMENT_KEY, it is much easier to use
    // `(readTime + 1, DocumentKey.empty())` since `> DocumentKey.empty()` matches
    // all valid document IDs.
    var n = t.toTimestamp().seconds, r = t.toTimestamp().nanoseconds + 1, i = ft.fromTimestamp(1e9 === r ? new ht(n + 1, 0) : new ht(n, r));
    return new Dt(i, mt.empty(), e);
}

/** Creates a new offset based on the provided document. */ function St(t) {
    return new Dt(t.readTime, t.key, -1);
}

/**
 * Stores the latest read time, document and batch ID that were processed for an
 * index.
 */ var Dt = /** @class */ function() {
    function t(
    /**
     * The latest read time version that has been indexed by Firestore for this
     * field index.
     */
    t, 
    /**
     * The key of the last document that was indexed for this query. Use
     * `DocumentKey.empty()` if no document has been indexed.
     */
    e, 
    /*
     * The largest mutation batch id that's been processed by Firestore.
     */
    n) {
        this.readTime = t, this.documentKey = e, this.largestBatchId = n
        /** Returns an offset that sorts before all regular offsets. */;
    }
    return t.min = function() {
        return new t(ft.min(), mt.empty(), -1);
    }, 
    /** Returns an offset that sorts after all regular offsets. */ t.max = function() {
        return new t(ft.max(), mt.empty(), -1);
    }, t;
}();

function _t(t, e) {
    var n = t.readTime.compareTo(e.readTime);
    return 0 !== n ? n : 0 !== (n = mt.comparator(t.documentKey, e.documentKey)) ? n : at(t.largestBatchId, e.largestBatchId);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO(indexing): Remove this constant
var xt = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.", Nt = /** @class */ function() {
    function t() {
        this.onCommittedListeners = [];
    }
    return t.prototype.addOnCommittedListener = function(t) {
        this.onCommittedListeners.push(t);
    }, t.prototype.raiseOnCommittedEvent = function() {
        this.onCommittedListeners.forEach((function(t) {
            return t();
        }));
    }, t;
}();

/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */
function At(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            if (t.code !== H.FAILED_PRECONDITION || t.message !== xt) throw t;
            return U("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
        }));
    }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */ var kt = /** @class */ function() {
    function t(t) {
        var e = this;
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
                this.nextCallback = null, this.catchCallback = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.isDone = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = !1, t((function(t) {
            e.isDone = !0, e.result = t, e.nextCallback && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            e.nextCallback(t);
        }), (function(t) {
            e.isDone = !0, e.error = t, e.catchCallback && e.catchCallback(t);
        }));
    }
    return t.prototype.catch = function(t) {
        return this.next(void 0, t);
    }, t.prototype.next = function(e, n) {
        var r = this;
        return this.callbackAttached && j(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(e, this.result) : new t((function(t, i) {
            r.nextCallback = function(n) {
                r.wrapSuccess(e, n).next(t, i);
            }, r.catchCallback = function(e) {
                r.wrapFailure(n, e).next(t, i);
            };
        }));
    }, t.prototype.toPromise = function() {
        var t = this;
        return new Promise((function(e, n) {
            t.next(e, n);
        }));
    }, t.prototype.wrapUserFunction = function(e) {
        try {
            var n = e();
            return n instanceof t ? n : t.resolve(n);
        } catch (e) {
            return t.reject(e);
        }
    }, t.prototype.wrapSuccess = function(e, n) {
        return e ? this.wrapUserFunction((function() {
            return e(n);
        })) : t.resolve(n);
    }, t.prototype.wrapFailure = function(e, n) {
        return e ? this.wrapUserFunction((function() {
            return e(n);
        })) : t.reject(n);
    }, t.resolve = function(e) {
        return new t((function(t, n) {
            t(e);
        }));
    }, t.reject = function(e) {
        return new t((function(t, n) {
            n(e);
        }));
    }, t.waitFor = function(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return new t((function(t, n) {
            var r = 0, i = 0, o = !1;
            e.forEach((function(e) {
                ++r, e.next((function() {
                    ++i, o && i === r && t();
                }), (function(t) {
                    return n(t);
                }));
            })), o = !0, i === r && t();
        }));
    }, 
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    t.or = function(e) {
        for (var n = t.resolve(!1), r = function(e) {
            n = n.next((function(n) {
                return n ? t.resolve(n) : e();
            }));
        }, i = 0, o = e; i < o.length; i++) {
            r(o[i]);
        }
        return n;
    }, t.forEach = function(t, e) {
        var n = this, r = [];
        return t.forEach((function(t, i) {
            r.push(e.call(n, t, i));
        })), this.waitFor(r);
    }, 
    /**
     * Concurrently map all array elements through asynchronous function.
     */
    t.mapArray = function(e, n) {
        return new t((function(t, r) {
            for (var i = e.length, o = new Array(i), u = 0, s = function(s) {
                var a = s;
                n(e[a]).next((function(e) {
                    o[a] = e, ++u === i && t(o);
                }), (function(t) {
                    return r(t);
                }));
            }, a = 0; a < i; a++) s(a);
        }));
    }, 
    /**
     * An alternative to recursive PersistencePromise calls, that avoids
     * potential memory problems from unbounded chains of promises.
     *
     * The `action` will be called repeatedly while `condition` is true.
     */
    t.doWhile = function(e, n) {
        return new t((function(t, r) {
            var i = function() {
                !0 === e() ? n().next((function() {
                    i();
                }), r) : t();
            };
            i();
        }));
    }, t;
}(), Ct = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.action = t, this.transaction = e, this.aborted = !1, 
        /**
             * A `Promise` that resolves with the result of the IndexedDb transaction.
             */
        this.T = new J, this.transaction.oncomplete = function() {
            n.T.resolve();
        }, this.transaction.onabort = function() {
            e.error ? n.T.reject(new Mt(t, e.error)) : n.T.resolve();
        }, this.transaction.onerror = function(e) {
            var r = qt(e.target.error);
            n.T.reject(new Mt(t, r));
        };
    }
    return t.open = function(e, n, r, i) {
        try {
            return new t(n, e.transaction(i, r));
        } catch (e) {
            throw new Mt(n, e);
        }
    }, Object.defineProperty(t.prototype, "A", {
        get: function() {
            return this.T.promise;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.abort = function(t) {
        t && this.T.reject(t), this.aborted || (U("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }, t.prototype.R = function() {
        // If the browser supports V3 IndexedDB, we invoke commit() explicitly to
        // speed up index DB processing if the event loop remains blocks.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var t = this.transaction;
        this.aborted || "function" != typeof t.commit || t.commit();
    }, 
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    t.prototype.store = function(t) {
        var e = this.transaction.objectStore(t);
        return new Lt(e);
    }, t;
}(), Vt = /** @class */ function() {
    /*
     * Creates a new SimpleDb wrapper for IndexedDb database `name`.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support
     * downgrading the schema version. We currently do not support any way to do
     * versioning outside of IndexedDB's versioning mechanism, as only
     * version-upgrade transactions are allowed to do things like create
     * objectstores.
     */
    function t(e, n, r) {
        this.name = e, this.version = n, this.P = r, 
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === t.v(d()) && B("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    /** Deletes the specified database. */    return t.delete = function(t) {
        return U("SimpleDb", "Removing database:", t), Ft(window.indexedDB.deleteDatabase(t)).toPromise();
    }, 
    /** Returns true if IndexedDB is available in the current environment. */ t.V = function() {
        if (!S()) return !1;
        if (t.S()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                var e = d(), n = t.v(e), r = 0 < n && n < 10, i = t.D(e), o = 0 < i && i < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || o);
    }, 
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t.S = function() {
        var t;
        return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.C);
    }, 
    /** Helper to get a typed SimpleDbStore from a transaction. */ t.N = function(t, e) {
        return t.store(e);
    }, 
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    t.v = function(t) {
        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    t.D = function(t) {
        var e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */
    t.prototype.k = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.db ? [ 3 /*break*/ , 2 ] : (U("SimpleDb", "Opening database:", this.name), 
                    e = this, [ 4 /*yield*/ , new Promise((function(e, n) {
                        // TODO(mikelehen): Investigate browser compatibility.
                        // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
                        // suggests IE9 and older WebKit browsers handle upgrade
                        // differently. They expect setVersion, as described here:
                        // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
                        var i = indexedDB.open(r.name, r.version);
                        i.onsuccess = function(t) {
                            var n = t.target.result;
                            e(n);
                        }, i.onblocked = function() {
                            n(new Mt(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                        }, i.onerror = function(e) {
                            var r = e.target.error;
                            "VersionError" === r.name ? n(new Y(H.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === r.name ? n(new Y(H.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + r)) : n(new Mt(t, r));
                        }, i.onupgradeneeded = function(t) {
                            U("SimpleDb", 'Database "' + r.name + '" requires upgrade from version:', t.oldVersion);
                            var e = t.target.result;
                            r.P.O(e, i.transaction, t.oldVersion, r.version).next((function() {
                                U("SimpleDb", "Database upgrade to version " + r.version + " complete");
                            }));
                        };
                    })) ]);

                  case 1:
                    e.db = n.sent(), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ , (this.M && (this.db.onversionchange = function(t) {
                        return r.M(t);
                    }), this.db) ];
                }
            }));
        }));
    }, t.prototype.F = function(t) {
        this.M = t, this.db && (this.db.onversionchange = function(e) {
            return t(e);
        });
    }, t.prototype.runTransaction = function(t, r, i, o) {
        return e(this, void 0, void 0, (function() {
            var e, u, s, a, c;
            return n(this, (function(l) {
                switch (l.label) {
                  case 0:
                    e = "readonly" === r, u = 0, s = function() {
                        var r, s, c, l, h;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                ++u, n.label = 1;

                              case 1:
                                return n.trys.push([ 1, 4, , 5 ]), [ 4 /*yield*/ , a.k(t) ];

                              case 2:
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                return a.db = n.sent(), r = Ct.open(a.db, t, e ? "readonly" : "readwrite", i), s = o(r).next((function(t) {
                                    return r.R(), t;
                                })).catch((function(t) {
                                    // Abort the transaction if there was an error.
                                    return r.abort(t), kt.reject(t);
                                })).toPromise(), c = {}, s.catch((function() {})), [ 4 /*yield*/ , r.A ];

                              case 3:
                                return [ 2 /*return*/ , (c.value = (
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                n.sent(), s), c) ];

                              case 4:
                                return l = n.sent(), h = "FirebaseError" !== l.name && u < 3, U("SimpleDb", "Transaction failed with error:", l.message, "Retrying:", h), 
                                a.close(), h ? [ 3 /*break*/ , 5 ] : [ 2 /*return*/ , {
                                    value: Promise.reject(l)
                                } ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, a = this, l.label = 1;

                  case 1:
                    return [ 5 /*yield**/ , s() ];

                  case 2:
                    if ("object" == typeof (c = l.sent())) return [ 2 /*return*/ , c.value ];
                    l.label = 3;

                  case 3:
                    return [ 3 /*break*/ , 1 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.close = function() {
        this.db && this.db.close(), this.db = void 0;
    }, t;
}(), Ot = /** @class */ function() {
    function t(t) {
        this.$ = t, this.B = !1, this.L = null;
    }
    return Object.defineProperty(t.prototype, "isDone", {
        get: function() {
            return this.B;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "U", {
        get: function() {
            return this.L;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "cursor", {
        set: function(t) {
            this.$ = t;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * This function can be called to stop iteration at any point.
     */
    t.prototype.done = function() {
        this.B = !0;
    }, 
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    t.prototype.q = function(t) {
        this.L = t;
    }, 
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    t.prototype.delete = function() {
        return Ft(this.$.delete());
    }, t;
}(), Mt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, H.UNAVAILABLE, "IndexedDB transaction '" + t + "' failed: " + n) || this).name = "IndexedDbTransactionError", 
        r;
    }
    return t(n, e), n;
}(Y);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// References to `window` are guarded by SimpleDb.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */
/** Verifies whether `e` is an IndexedDbTransactionError. */ function Rt(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
}

/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */ var Lt = /** @class */ function() {
    function t(t) {
        this.store = t;
    }
    return t.prototype.put = function(t, e) {
        var n;
        return void 0 !== e ? (U("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (U("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), Ft(n);
    }, 
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    t.prototype.add = function(t) {
        return U("SimpleDb", "ADD", this.store.name, t, t), Ft(this.store.add(t));
    }, 
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */
    t.prototype.get = function(t) {
        var e = this;
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return Ft(this.store.get(t)).next((function(n) {
            // Normalize nonexistence to null.
            return void 0 === n && (n = null), U("SimpleDb", "GET", e.store.name, t, n), n;
        }));
    }, t.prototype.delete = function(t) {
        return U("SimpleDb", "DELETE", this.store.name, t), Ft(this.store.delete(t));
    }, 
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t.prototype.count = function() {
        return U("SimpleDb", "COUNT", this.store.name), Ft(this.store.count());
    }, t.prototype.K = function(t, e) {
        var n = this.options(t, e);
        // Use `getAll()` if the browser supports IndexedDB v3, as it is roughly
        // 20% faster. Unfortunately, getAll() does not support custom indices.
                if (n.index || "function" != typeof this.store.getAll) {
            var r = this.cursor(n), i = [];
            return this.G(r, (function(t, e) {
                i.push(e);
            })).next((function() {
                return i;
            }));
        }
        var o = this.store.getAll(n.range);
        return new kt((function(t, e) {
            o.onerror = function(t) {
                e(t.target.error);
            }, o.onsuccess = function(e) {
                t(e.target.result);
            };
        }));
    }, 
    /**
     * Loads the first `count` elements from the provided index range. Loads all
     * elements if no limit is provided.
     */
    t.prototype.j = function(t, e) {
        var n = this.store.getAll(t, null === e ? void 0 : e);
        return new kt((function(t, e) {
            n.onerror = function(t) {
                e(t.target.error);
            }, n.onsuccess = function(e) {
                t(e.target.result);
            };
        }));
    }, t.prototype.W = function(t, e) {
        U("SimpleDb", "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.H = !1;
        var r = this.cursor(n);
        return this.G(r, (function(t, e, n) {
            return n.delete();
        }));
    }, t.prototype.J = function(t, e) {
        var n;
        e ? n = t : (n = {}, e = t);
        var r = this.cursor(n);
        return this.G(r, e);
    }, 
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    t.prototype.Y = function(t) {
        var e = this.cursor({});
        return new kt((function(n, r) {
            e.onerror = function(t) {
                var e = qt(t.target.error);
                r(e);
            }, e.onsuccess = function(e) {
                var r = e.target.result;
                r ? t(r.primaryKey, r.value).next((function(t) {
                    t ? r.continue() : n();
                })) : n();
            };
        }));
    }, t.prototype.G = function(t, e) {
        var n = [];
        return new kt((function(r, i) {
            t.onerror = function(t) {
                i(t.target.error);
            }, t.onsuccess = function(t) {
                var i = t.target.result;
                if (i) {
                    var o = new Ot(i), u = e(i.primaryKey, i.value, o);
                    if (u instanceof kt) {
                        var s = u.catch((function(t) {
                            return o.done(), kt.reject(t);
                        }));
                        n.push(s);
                    }
                    o.isDone ? r() : null === o.U ? i.continue() : i.continue(o.U);
                } else r();
            };
        })).next((function() {
            return kt.waitFor(n);
        }));
    }, t.prototype.options = function(t, e) {
        var n;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }, t.prototype.cursor = function(t) {
        var e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            var n = this.store.index(t.index);
            return t.H ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }, t;
}();

/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */ function Ft(t) {
    return new kt((function(e, n) {
        t.onsuccess = function(t) {
            var n = t.target.result;
            e(n);
        }, t.onerror = function(t) {
            var e = qt(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
var Pt = !1;

function qt(t) {
    var e = Vt.v(d());
    if (e >= 12.2 && e < 13) {
        var n = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(n) >= 0) {
            // Wrap error in a more descriptive one.
            var r = new Y("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
            return Pt || (Pt = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((function() {
                throw r;
            }), 0)), r;
        }
    }
    return t;
}

/** This class is responsible for the scheduling of Index Backfiller. */ var Ut = /** @class */ function() {
    function t(t, e) {
        this.asyncQueue = t, this.X = e, this.task = null;
    }
    return t.prototype.start = function() {}, t.prototype.stop = function() {
        this.task && (this.task.cancel(), this.task = null);
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return null !== this.task;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.Z = function(t) {
        var r = this;
        U("IndexBackiller", "Scheduled in " + t + "ms"), this.task = this.asyncQueue.enqueueAfterDelay("index_backfill" /* IndexBackfill */ , t, (function() {
            return e(r, void 0, void 0, (function() {
                var t, e, r, i;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        this.task = null, n.label = 1;

                      case 1:
                        return n.trys.push([ 1, 3, , 7 ]), t = U, e = [ "IndexBackiller" ], r = "Documents written: ", 
                        [ 4 /*yield*/ , this.X.tt() ];

                      case 2:
                        return t.apply(void 0, e.concat([ r + n.sent() ])), [ 3 /*break*/ , 7 ];

                      case 3:
                        return Rt(i = n.sent()) ? (U("IndexBackiller", "Ignoring IndexedDB error during index backfill: ", i), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , At(i) ];

                      case 5:
                        n.sent(), n.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.Z(1) ];

                      case 8:
                        return n.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), Bt = /** @class */ function() {
    function t(
    /**
     * LocalStore provides access to IndexManager and LocalDocumentView.
     * These properties will update when the user changes. Consequently,
     * making a local copy of IndexManager and LocalDocumentView will require
     * updates over time. The simpler solution is to rely on LocalStore to have
     * an up-to-date references to IndexManager and LocalDocumentStore.
     */
    t, e) {
        this.localStore = t, this.persistence = e;
    }
    return t.prototype.tt = function(t) {
        return void 0 === t && (t = 50), e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                return [ 2 /*return*/ , this.persistence.runTransaction("Backfill Indexes", "readwrite-primary", (function(n) {
                    return e.et(n, t);
                })) ];
            }));
        }));
    }, 
    /** Writes index entries until the cap is reached. Returns the number of documents processed. */ t.prototype.et = function(t, e) {
        var n = this, r = new Set, i = e, o = !0;
        return kt.doWhile((function() {
            return !0 === o && i > 0;
        }), (function() {
            return n.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((function(e) {
                if (null !== e && !r.has(e)) return U("IndexBackiller", "Processing collection: " + e), 
                n.nt(t, e, i).next((function(t) {
                    i -= t, r.add(e);
                }));
                o = !1;
            }));
        })).next((function() {
            return e - i;
        }));
    }, 
    /**
     * Writes entries for the provided collection group. Returns the number of documents processed.
     */
    t.prototype.nt = function(t, e, n) {
        var r = this;
        // Use the earliest offset of all field indexes to query the local cache.
                return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t, e).next((function(i) {
            return r.localStore.localDocuments.getNextDocuments(t, e, i, n).next((function(n) {
                var o = n.changes;
                return r.localStore.indexManager.updateIndexEntries(t, o).next((function() {
                    return r.st(i, n);
                })).next((function(n) {
                    return U("IndexBackiller", "Updating offset: " + n), r.localStore.indexManager.updateCollectionGroup(t, e, n);
                })).next((function() {
                    return o.size;
                }));
            }));
        }));
    }, 
    /** Returns the next offset based on the provided documents. */ t.prototype.st = function(t, e) {
        var n = t;
        return e.changes.forEach((function(t, e) {
            var r = St(e);
            _t(r, n) > 0 && (n = r);
        })), new Dt(n.readTime, n.documentKey, Math.max(e.batchId, t.largestBatchId));
    }, t;
}(), Kt = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.previousValue = t, e && (e.sequenceNumberHandler = function(t) {
            return n.it(t);
        }, this.rt = function(t) {
            return e.writeSequenceNumber(t);
        });
    }
    return t.prototype.it = function(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }, t.prototype.next = function() {
        var t = ++this.previousValue;
        return this.rt && this.rt(t), t;
    }, t;
}();

/** Implements the steps for backfilling indexes. */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gt(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function jt(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function zt(t) {
    for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
Kt.ot = -1;

var Qt = /** @class */ function() {
    function t(t, e) {
        this.comparator = t, this.root = e || Ht.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.insert = function(e, n) {
        return new t(this.comparator, this.root.insert(e, n, this.comparator).copy(null, null, Ht.BLACK, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Ht.BLACK, null, null));
    }, 
    // Returns the value of the node with the given key, or null.
    t.prototype.get = function(t) {
        for (var e = this.root; !e.isEmpty(); ) {
            var n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }, 
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    t.prototype.indexOf = function(t) {
        for (
        // Number of nodes that were pruned when descending right
        var e = 0, n = this.root; !n.isEmpty(); ) {
            var r = this.comparator(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }, t.prototype.isEmpty = function() {
        return this.root.isEmpty();
    }, Object.defineProperty(t.prototype, "size", {
        // Returns the total number of nodes in the map.
        get: function() {
            return this.root.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Returns the minimum key in the map.
    t.prototype.minKey = function() {
        return this.root.minKey();
    }, 
    // Returns the maximum key in the map.
    t.prototype.maxKey = function() {
        return this.root.maxKey();
    }, 
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.inorderTraversal = function(t) {
        return this.root.inorderTraversal(t);
    }, t.prototype.forEach = function(t) {
        this.inorderTraversal((function(e, n) {
            return t(e, n), !1;
        }));
    }, t.prototype.toString = function() {
        var t = [];
        return this.inorderTraversal((function(e, n) {
            return t.push(e + ":" + n), !1;
        })), "{" + t.join(", ") + "}";
    }, 
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.reverseTraversal = function(t) {
        return this.root.reverseTraversal(t);
    }, 
    // Returns an iterator over the SortedMap.
    t.prototype.getIterator = function() {
        return new Wt(this.root, null, this.comparator, !1);
    }, t.prototype.getIteratorFrom = function(t) {
        return new Wt(this.root, t, this.comparator, !1);
    }, t.prototype.getReverseIterator = function() {
        return new Wt(this.root, null, this.comparator, !0);
    }, t.prototype.getReverseIteratorFrom = function(t) {
        return new Wt(this.root, t, this.comparator, !0);
    }, t;
}(), Wt = /** @class */ function() {
    function t(t, e, n, r) {
        this.isReverse = r, this.nodeStack = [];
        for (var i = 1; !t.isEmpty(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        e && r && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.isReverse ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.nodeStack.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
                        this.nodeStack.push(t), t = this.isReverse ? t.right : t.left;
        }
    }
    return t.prototype.getNext = function() {
        var t = this.nodeStack.pop(), e = {
            key: t.key,
            value: t.value
        };
        if (this.isReverse) for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), 
        t = t.left;
        return e;
    }, t.prototype.hasNext = function() {
        return this.nodeStack.length > 0;
    }, t.prototype.peek = function() {
        if (0 === this.nodeStack.length) return null;
        var t = this.nodeStack[this.nodeStack.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }, t;
}(), Ht = /** @class */ function() {
    function t(e, n, r, i, o) {
        this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : t.EMPTY, 
        this.right = null != o ? o : t.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
        return t.prototype.copy = function(e, n, r, i, o) {
        return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t.prototype.isEmpty = function() {
        return !1;
    }, 
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.inorderTraversal = function(t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t);
    }, 
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.reverseTraversal = function(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t);
    }, 
    // Returns the minimum node in the tree.
    t.prototype.min = function() {
        return this.left.isEmpty() ? this : this.left.min();
    }, 
    // Returns the maximum key in the tree.
    t.prototype.minKey = function() {
        return this.min().key;
    }, 
    // Returns the maximum key in the tree.
    t.prototype.maxKey = function() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }, 
    // Returns new tree, with the key/value added.
    t.prototype.insert = function(t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.copy(null, null, null, r.left.insert(t, e, n), null) : 0 === i ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t, e, n))).fixUp();
    }, t.prototype.removeMin = function() {
        if (this.left.isEmpty()) return t.EMPTY;
        var e = this;
        return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), (e = e.copy(null, null, null, e.left.removeMin(), null)).fixUp();
    }, 
    // Returns new tree, with the specified item removed.
    t.prototype.remove = function(e, n) {
        var r, i = this;
        if (n(e, i.key) < 0) i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()), 
        i = i.copy(null, null, null, i.left.remove(e, n), null); else {
            if (i.left.isRed() && (i = i.rotateRight()), i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()), 
            0 === n(e, i.key)) {
                if (i.right.isEmpty()) return t.EMPTY;
                r = i.right.min(), i = i.copy(r.key, r.value, null, null, i.right.removeMin());
            }
            i = i.copy(null, null, null, null, i.right.remove(e, n));
        }
        return i.fixUp();
    }, t.prototype.isRed = function() {
        return this.color;
    }, 
    // Returns new tree after performing any needed rotations.
    t.prototype.fixUp = function() {
        var t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), 
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t;
    }, t.prototype.moveRedLeft = function() {
        var t = this.colorFlip();
        return t.right.left.isRed() && (t = (t = (t = t.copy(null, null, null, null, t.right.rotateRight())).rotateLeft()).colorFlip()), 
        t;
    }, t.prototype.moveRedRight = function() {
        var t = this.colorFlip();
        return t.left.left.isRed() && (t = (t = t.rotateRight()).colorFlip()), t;
    }, t.prototype.rotateLeft = function() {
        var e = this.copy(null, null, t.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
    }, t.prototype.rotateRight = function() {
        var e = this.copy(null, null, t.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
    }, t.prototype.colorFlip = function() {
        var t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e);
    }, 
    // For testing.
    t.prototype.checkMaxDepth = function() {
        var t = this.check();
        return Math.pow(2, t) <= this.size + 1;
    }, 
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t.prototype.check = function() {
        if (this.isRed() && this.left.isRed()) throw j();
        if (this.right.isRed()) throw j();
        var t = this.left.check();
        if (t !== this.right.check()) throw j();
        return t + (this.isRed() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Ht.EMPTY = null, Ht.RED = !0, Ht.BLACK = !1, 
// end LLRBEmptyNode
Ht.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw j();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw j();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw j();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw j();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw j();
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Returns a copy of the current node.
    t.prototype.copy = function(t, e, n, r, i) {
        return this;
    }, 
    // Returns a copy of the tree, with the specified key/value added.
    t.prototype.insert = function(t, e, n) {
        return new Ht(t, e);
    }, 
    // Returns a copy of the tree, with the specified key removed.
    t.prototype.remove = function(t, e) {
        return this;
    }, t.prototype.isEmpty = function() {
        return !0;
    }, t.prototype.inorderTraversal = function(t) {
        return !1;
    }, t.prototype.reverseTraversal = function(t) {
        return !1;
    }, t.prototype.minKey = function() {
        return null;
    }, t.prototype.maxKey = function() {
        return null;
    }, t.prototype.isRed = function() {
        return !1;
    }, 
    // For testing.
    t.prototype.checkMaxDepth = function() {
        return !0;
    }, t.prototype.check = function() {
        return 0;
    }, t;
}());

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
var Yt = /** @class */ function() {
    function t(t) {
        this.comparator = t, this.data = new Qt(this.comparator);
    }
    return t.prototype.has = function(t) {
        return null !== this.data.get(t);
    }, t.prototype.first = function() {
        return this.data.minKey();
    }, t.prototype.last = function() {
        return this.data.maxKey();
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.data.size;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.indexOf = function(t) {
        return this.data.indexOf(t);
    }, 
    /** Iterates elements in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.data.inorderTraversal((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */ t.prototype.forEachInRange = function(t, e) {
        for (var n = this.data.getIteratorFrom(t[0]); n.hasNext(); ) {
            var r = n.getNext();
            if (this.comparator(r.key, t[1]) >= 0) return;
            e(r.key);
        }
    }, 
    /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */
    t.prototype.forEachWhile = function(t, e) {
        var n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) if (!t(n.getNext().key)) return;
    }, 
    /** Finds the least element greater than or equal to `elem`. */ t.prototype.firstAfterOrEqual = function(t) {
        var e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null;
    }, t.prototype.getIterator = function() {
        return new Jt(this.data.getIterator());
    }, t.prototype.getIteratorFrom = function(t) {
        return new Jt(this.data.getIteratorFrom(t));
    }, 
    /** Inserts or updates an element */ t.prototype.add = function(t) {
        return this.copy(this.data.remove(t).insert(t, !0));
    }, 
    /** Deletes an element */ t.prototype.delete = function(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this;
    }, t.prototype.isEmpty = function() {
        return this.data.isEmpty();
    }, t.prototype.unionWith = function(t) {
        var e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((function(t) {
            e = e.add(t);
        })), e;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.data.getIterator(), r = e.data.getIterator(); n.hasNext(); ) {
            var i = n.getNext().key, o = r.getNext().key;
            if (0 !== this.comparator(i, o)) return !1;
        }
        return !0;
    }, t.prototype.toArray = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e);
        })), t;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            return t.push(e);
        })), "SortedSet(" + t.toString() + ")";
    }, t.prototype.copy = function(e) {
        var n = new t(this.comparator);
        return n.data = e, n;
    }, t;
}(), Jt = /** @class */ function() {
    function t(t) {
        this.iter = t;
    }
    return t.prototype.getNext = function() {
        return this.iter.getNext().key;
    }, t.prototype.hasNext = function() {
        return this.iter.hasNext();
    }, t;
}();

/**
 * Compares two sorted sets for equality using their natural ordering. The
 * method computes the intersection and invokes `onAdd` for every element that
 * is in `after` but not `before`. `onRemove` is invoked for every element in
 * `before` but missing from `after`.
 *
 * The method creates a copy of both `before` and `after` and runs in O(n log
 * n), where n is the size of the two lists.
 *
 * @param before - The elements that exist in the original set.
 * @param after - The elements to diff against the original set.
 * @param comparator - The comparator for the elements in before and after.
 * @param onAdd - A function to invoke for every element that is part of `
 * after` but not `before`.
 * @param onRemove - A function to invoke for every element that is part of
 * `before` but not `after`.
 */
/**
 * Returns the next element from the iterator or `undefined` if none available.
 */
function Xt(t) {
    return t.hasNext() ? t.getNext() : void 0;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ var $t = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(yt.comparator);
    }
    return t.empty = function() {
        return new t([]);
    }, 
    /**
     * Returns a new FieldMask object that is the result of adding all the given
     * fields paths to this field mask.
     */
    t.prototype.unionWith = function(e) {
        for (var n = new Yt(yt.comparator), r = 0, i = this.fields; r < i.length; r++) {
            var o = i[r];
            n = n.add(o);
        }
        for (var u = 0, s = e; u < s.length; u++) {
            var a = s[u];
            n = n.add(a);
        }
        return new t(n.toArray());
    }, 
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */
    t.prototype.covers = function(t) {
        for (var e = 0, n = this.fields; e < n.length; e++) {
            if (n[e].isPrefixOf(t)) return !0;
        }
        return !1;
    }, t.prototype.isEqual = function(t) {
        return ct(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Converts a Base64 encoded string to a binary string. */
/** True if and only if the Base64 conversion functions are available. */ function Zt() {
    return "undefined" != typeof atob;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */ var te = /** @class */ function() {
    function t(t) {
        this.binaryString = t;
    }
    return t.fromBase64String = function(e) {
        return new t(atob(e));
    }, t.fromUint8Array = function(e) {
        // TODO(indexing); Remove the copy of the byte string here as this method
        // is frequently called during indexing.
        var n = 
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            for (var e = "", n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }(e);
        return new t(n);
    }, t.prototype[Symbol.iterator] = function() {
        var t = this, e = 0;
        return {
            next: function() {
                return e < t.binaryString.length ? {
                    value: t.binaryString.charCodeAt(e++),
                    done: !1
                } : {
                    value: void 0,
                    done: !0
                };
            }
        };
    }, t.prototype.toBase64 = function() {
        return t = this.binaryString, btoa(t);
        /** Converts a binary string to a Base64 encoded string. */        var t;
    }, t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.binaryString);
    }, t.prototype.approximateByteSize = function() {
        return 2 * this.binaryString.length;
    }, t.prototype.compareTo = function(t) {
        return at(this.binaryString, t.binaryString);
    }, t.prototype.isEqual = function(t) {
        return this.binaryString === t.binaryString;
    }, t;
}();

te.EMPTY_BYTE_STRING = new te("");

var ee = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function ne(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (z(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = ee.exec(t);
        if (z(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            var r = n[1];
            r = (r + "000000000").substr(0, 9), e = Number(r);
        }
        // Parse the date to get the seconds.
                var i = new Date(t);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: re(t.seconds),
        nanos: re(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function re(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function ie(t) {
    return "string" == typeof t ? te.fromBase64String(t) : te.fromUint8Array(t);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ function oe(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */ function ue(t) {
    var e = t.mapValue.fields.__previous_value__;
    return oe(e) ? ue(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function se(t) {
    var e = ne(t.mapValue.fields.__local_write_time__.timestampValue);
    return new ht(e.seconds, e.nanos);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ae = 
/**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId - The database to use.
     * @param appId - The Firebase App Id.
     * @param persistenceKey - A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host - The Firestore backend host to connect to.
     * @param ssl - Whether to use SSL when connecting.
     * @param forceLongPolling - Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
     * option when using WebChannel as the network transport.
     * @param useFetchStreams Whether to use the Fetch API instead of
     * XMLHTTPRequest
     */
function(t, e, n, r, i, o, u, s) {
    this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = r, this.ssl = i, 
    this.forceLongPolling = o, this.autoDetectLongPolling = u, this.useFetchStreams = s;
}, ce = /** @class */ function() {
    function t(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    return t.empty = function() {
        return new t("", "");
    }, Object.defineProperty(t.prototype, "isDefaultDatabase", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return e instanceof t && e.projectId === this.projectId && e.database === this.database;
    }, t;
}();

/** The default database name for a project. */
/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Sentinel value that sorts before any Mutation Batch ID. */
/**
 * Returns whether a variable is either undefined or null.
 */
function le(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function he(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */ function fe(t) {
    return "number" == typeof t && Number.isInteger(t) && !he(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var de = {
    mapValue: {
        fields: {
            __type__: {
                stringValue: "__max__"
            }
        }
    }
}, pe = {
    nullValue: "NULL_VALUE"
};

/** Extracts the backend's type order for the provided value. */ function ve(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? oe(t) ? 4 /* ServerTimestampValue */ : Ae(t) ? 9007199254740991 /* MaxValue */ : 10 /* ObjectValue */ : j();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function ye(t, e) {
    if (t === e) return !0;
    var n = ve(t);
    if (n !== ve(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
      case 9007199254740991 /* MaxValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return se(t).isEqual(se(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = ne(t.timestampValue), r = ne(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return ie(t.bytesValue).isEqual(ie(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return re(t.geoPointValue.latitude) === re(e.geoPointValue.latitude) && re(t.geoPointValue.longitude) === re(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return re(t.integerValue) === re(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = re(t.doubleValue), r = re(e.doubleValue);
                return n === r ? he(n) === he(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return ct(t.arrayValue.values || [], e.arrayValue.values || [], ye);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (Gt(n) !== Gt(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !ye(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return j();
    }
}

function me(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return ye(t, e);
    }));
}

function ge(t, e) {
    if (t === e) return 0;
    var n = ve(t), r = ve(e);
    if (n !== r) return at(n, r);
    switch (n) {
      case 0 /* NullValue */ :
      case 9007199254740991 /* MaxValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return at(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = re(t.integerValue || t.doubleValue), r = re(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return we(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return we(se(t), se(e));

      case 5 /* StringValue */ :
        return at(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = ie(t), r = ie(e);
            return n.compareTo(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = at(n[i], r[i]);
                if (0 !== o) return o;
            }
            return at(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = at(re(t.latitude), re(e.latitude));
            return 0 !== n ? n : at(re(t.longitude), re(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = ge(n[i], r[i]);
                if (o) return o;
            }
            return at(n.length, r.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            if (t === de.mapValue && e === de.mapValue) return 0;
            if (t === de.mapValue) return 1;
            if (e === de.mapValue) return -1;
            var n = t.fields || {}, r = Object.keys(n), i = e.fields || {}, o = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
                        r.sort(), o.sort();
            for (var u = 0; u < r.length && u < o.length; ++u) {
                var s = at(r[u], o[u]);
                if (0 !== s) return s;
                var a = ge(n[r[u]], i[o[u]]);
                if (0 !== a) return a;
            }
            return at(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw j();
    }
}

function we(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return at(t, e);
    var n = ne(t), r = ne(e), i = at(n.seconds, r.seconds);
    return 0 !== i ? i : at(n.nanos, r.nanos);
}

function be(t) {
    return Ie(t);
}

function Ie(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        var e = ne(t);
        return "time(" + e.seconds + "," + e.nanos + ")";
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? ie(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
    mt.fromName(n).toString()) : "geoPointValue" in t ? "geo(" + (e = t.geoPointValue).latitude + "," + e.longitude + ")" : "arrayValue" in t ? function(t) {
        for (var e = "[", n = !0, r = 0, i = t.values || []; r < i.length; r++) {
            n ? n = !1 : e += ",", e += Ie(i[r]);
        }
        return e + "]";
    }(t.arrayValue) : "mapValue" in t ? function(t) {
        for (
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        var e = "{", n = !0, r = 0, i = Object.keys(t.fields || {}).sort(); r < i.length; r++) {
            var o = i[r];
            n ? n = !1 : e += ",", e += o + ":" + Ie(t.fields[o]);
        }
        return e + "}";
    }(t.mapValue) : j();
    var e, n;
}

function Ee(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.canonicalString()
    };
}

/** Returns true if `value` is an IntegerValue . */ function Te(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function Se(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function De(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function _e(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function xe(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function Ne(t) {
    if (t.geoPointValue) return {
        geoPointValue: Object.assign({}, t.geoPointValue)
    };
    if (t.timestampValue && "object" == typeof t.timestampValue) return {
        timestampValue: Object.assign({}, t.timestampValue)
    };
    if (t.mapValue) {
        var e = {
            mapValue: {
                fields: {}
            }
        };
        return jt(t.mapValue.fields, (function(t, n) {
            return e.mapValue.fields[t] = Ne(n);
        })), e;
    }
    if (t.arrayValue) {
        for (var n = {
            arrayValue: {
                values: []
            }
        }, r = 0; r < (t.arrayValue.values || []).length; ++r) n.arrayValue.values[r] = Ne(t.arrayValue.values[r]);
        return n;
    }
    return Object.assign({}, t);
}

/** Returns true if the Value represents the canonical {@link #MAX_VALUE} . */ function Ae(t) {
    return "__max__" === (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}

/** Returns the lowest value for the given value type (inclusive). */ function ke(t) {
    return "nullValue" in t ? pe : "booleanValue" in t ? {
        booleanValue: !1
    } : "integerValue" in t || "doubleValue" in t ? {
        doubleValue: NaN
    } : "timestampValue" in t ? {
        timestampValue: {
            seconds: Number.MIN_SAFE_INTEGER
        }
    } : "stringValue" in t ? {
        stringValue: ""
    } : "bytesValue" in t ? {
        bytesValue: ""
    } : "referenceValue" in t ? Ee(ce.empty(), mt.empty()) : "geoPointValue" in t ? {
        geoPointValue: {
            latitude: -90,
            longitude: -180
        }
    } : "arrayValue" in t ? {
        arrayValue: {}
    } : "mapValue" in t ? {
        mapValue: {}
    } : j();
}

/** Returns the largest value for the given value type (exclusive). */ function Ce(t) {
    return "nullValue" in t ? {
        booleanValue: !1
    } : "booleanValue" in t ? {
        doubleValue: NaN
    } : "integerValue" in t || "doubleValue" in t ? {
        timestampValue: {
            seconds: Number.MIN_SAFE_INTEGER
        }
    } : "timestampValue" in t ? {
        stringValue: ""
    } : "stringValue" in t ? {
        bytesValue: ""
    } : "bytesValue" in t ? Ee(ce.empty(), mt.empty()) : "referenceValue" in t ? {
        geoPointValue: {
            latitude: -90,
            longitude: -180
        }
    } : "geoPointValue" in t ? {
        arrayValue: {}
    } : "arrayValue" in t ? {
        mapValue: {}
    } : "mapValue" in t ? de : j();
}

function Ve(t, e) {
    var n = ge(t.value, e.value);
    return 0 !== n ? n : t.inclusive && !e.inclusive ? -1 : !t.inclusive && e.inclusive ? 1 : 0;
}

function Oe(t, e) {
    var n = ge(t.value, e.value);
    return 0 !== n ? n : t.inclusive && !e.inclusive ? 1 : !t.inclusive && e.inclusive ? -1 : 0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */ var Me = /** @class */ function() {
    function t(t) {
        this.value = t;
    }
    return t.empty = function() {
        return new t({
            mapValue: {}
        });
    }, 
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    t.prototype.field = function(t) {
        if (t.isEmpty()) return this.value;
        for (var e = this.value, n = 0; n < t.length - 1; ++n) if (!xe(e = (e.mapValue.fields || {})[t.get(n)])) return null;
        return (e = (e.mapValue.fields || {})[t.lastSegment()]) || null;
    }, 
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    t.prototype.set = function(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = Ne(e);
    }, 
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    t.prototype.setAll = function(t) {
        var e = this, n = yt.emptyPath(), r = {}, i = [];
        t.forEach((function(t, o) {
            if (!n.isImmediateParentOf(o)) {
                // Insert the accumulated changes at this parent location
                var u = e.getFieldsMap(n);
                e.applyChanges(u, r, i), r = {}, i = [], n = o.popLast();
            }
            t ? r[o.lastSegment()] = Ne(t) : i.push(o.lastSegment());
        }));
        var o = this.getFieldsMap(n);
        this.applyChanges(o, r, i);
    }, 
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    t.prototype.delete = function(t) {
        var e = this.field(t.popLast());
        xe(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }, t.prototype.isEqual = function(t) {
        return ye(this.value, t.value);
    }, 
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    t.prototype.getFieldsMap = function(t) {
        var e = this.value;
        e.mapValue.fields || (e.mapValue = {
            fields: {}
        });
        for (var n = 0; n < t.length; ++n) {
            var r = e.mapValue.fields[t.get(n)];
            xe(r) && r.mapValue.fields || (r = {
                mapValue: {
                    fields: {}
                }
            }, e.mapValue.fields[t.get(n)] = r), e = r;
        }
        return e.mapValue.fields;
    }, 
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    t.prototype.applyChanges = function(t, e, n) {
        jt(e, (function(e, n) {
            return t[e] = n;
        }));
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            delete t[o];
        }
    }, t.prototype.clone = function() {
        return new t(Ne(this.value));
    }, t;
}();

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function Re(t) {
    var e = [];
    return jt(t.fields, (function(t, n) {
        var r = new yt([ t ]);
        if (xe(n)) {
            var i = Re(n.mapValue).fields;
            if (0 === i.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(r); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (var o = 0, u = i; o < u.length; o++) {
                var s = u[o];
                e.push(r.child(s));
            }
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(r);
    })), new $t(e)
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */;
}

var Le = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.key = t, this.documentType = e, this.version = n, this.readTime = r, this.data = i, 
        this.documentState = o
        /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */;
    }
    return t.newInvalidDocument = function(e) {
        return new t(e, 0 /* INVALID */ , ft.min(), ft.min(), Me.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    t.newFoundDocument = function(e, n, r) {
        return new t(e, 1 /* FOUND_DOCUMENT */ , n, ft.min(), r, 0 /* SYNCED */);
    }, 
    /** Creates a new document that is known to not exist at the given version. */ t.newNoDocument = function(e, n) {
        return new t(e, 2 /* NO_DOCUMENT */ , n, ft.min(), Me.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.newUnknownDocument = function(e, n) {
        return new t(e, 3 /* UNKNOWN_DOCUMENT */ , n, ft.min(), Me.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
    }, 
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    t.prototype.convertToFoundDocument = function(t, e) {
        return this.version = t, this.documentType = 1 /* FOUND_DOCUMENT */ , this.data = e, 
        this.documentState = 0 /* SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */
    t.prototype.convertToNoDocument = function(t) {
        return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = Me.empty(), 
        this.documentState = 0 /* SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.prototype.convertToUnknownDocument = function(t) {
        return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = Me.empty(), 
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }, t.prototype.setHasCommittedMutations = function() {
        return this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }, t.prototype.setHasLocalMutations = function() {
        return this.documentState = 1 /* HAS_LOCAL_MUTATIONS */ , this.version = ft.min(), 
        this;
    }, t.prototype.setReadTime = function(t) {
        return this.readTime = t, this;
    }, Object.defineProperty(t.prototype, "hasLocalMutations", {
        get: function() {
            return 1 /* HAS_LOCAL_MUTATIONS */ === this.documentState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "hasCommittedMutations", {
        get: function() {
            return 2 /* HAS_COMMITTED_MUTATIONS */ === this.documentState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return this.hasLocalMutations || this.hasCommittedMutations;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isValidDocument = function() {
        return 0 /* INVALID */ !== this.documentType;
    }, t.prototype.isFoundDocument = function() {
        return 1 /* FOUND_DOCUMENT */ === this.documentType;
    }, t.prototype.isNoDocument = function() {
        return 2 /* NO_DOCUMENT */ === this.documentType;
    }, t.prototype.isUnknownDocument = function() {
        return 3 /* UNKNOWN_DOCUMENT */ === this.documentType;
    }, t.prototype.isEqual = function(e) {
        return e instanceof t && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
    }, t.prototype.mutableCopy = function() {
        return new t(this.key, this.documentType, this.version, this.readTime, this.data.clone(), this.documentState);
    }, t.prototype.toString = function() {
        return "Document(" + this.key + ", " + this.version + ", " + JSON.stringify(this.data.value) + ", {documentType: " + this.documentType + "}), {documentState: " + this.documentState + "})";
    }, t;
}(), Fe = function(t, e, n, r, i, o, u) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === u && (u = null), 
    this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = i, 
    this.startAt = o, this.endAt = u, this.ut = null;
};

/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Visible for testing
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
function Pe(t, e, n, r, i, o, u) {
    return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === u && (u = null), 
    new Fe(t, e, n, r, i, o, u);
}

function qe(t) {
    var e = W(t);
    if (null === e.ut) {
        var n = e.path.canonicalString();
        null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map((function(t) {
            return (e = t).field.canonicalString() + e.op.toString() + be(e.value);
            var e;
        })).join(","), n += "|ob:", n += e.orderBy.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.canonicalString() + t.dir;
            }(t);
        })).join(","), le(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", 
        n += e.startAt.inclusive ? "b:" : "a:", n += e.startAt.position.map((function(t) {
            return be(t);
        })).join(",")), e.endAt && (n += "|ub:", n += e.endAt.inclusive ? "a:" : "b:", n += e.endAt.position.map((function(t) {
            return be(t);
        })).join(",")), e.ut = n;
    }
    return e.ut;
}

function Ue(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (var n = 0; n < t.orderBy.length; n++) if (!nn(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (var r = 0; r < t.filters.length; r++) if (i = t.filters[r], o = e.filters[r], 
    i.op !== o.op || !i.field.isEqual(o.field) || !ye(i.value, o.value)) return !1;
    var i, o;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!on(t.startAt, e.startAt) && on(t.endAt, e.endAt);
}

function Be(t) {
    return mt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

/** Returns the field filters that target the given field path. */ function Ke(t, e) {
    return t.filters.filter((function(t) {
        return t instanceof ze && t.field.isEqual(e);
    }));
}

/**
 * Returns the values that are used in ARRAY_CONTAINS or ARRAY_CONTAINS_ANY
 * filters. Returns `null` if there are no such filters.
 */
/**
 * Returns the value to use as the lower bound for ascending index segment at
 * the provided `fieldPath` (or the upper bound for an descending segment).
 */ function Ge(t, e, n) {
    // Process all filters to find a value for the current field segment
    for (var r = pe, i = !0, o = 0, u = Ke(t, e); o < u.length; o++) {
        var s = u[o], a = pe, c = !0;
        switch (s.op) {
          case "<" /* LESS_THAN */ :
          case "<=" /* LESS_THAN_OR_EQUAL */ :
            a = ke(s.value);
            break;

          case "==" /* EQUAL */ :
          case "in" /* IN */ :
          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            a = s.value;
            break;

          case ">" /* GREATER_THAN */ :
            a = s.value, c = !1;
            break;

          case "!=" /* NOT_EQUAL */ :
          case "not-in" /* NOT_IN */ :
            a = pe;
            // Remaining filters cannot be used as lower bounds.
                }
        Ve({
            value: r,
            inclusive: i
        }, {
            value: a,
            inclusive: c
        }) < 0 && (r = a, i = c);
    }
    // If there is an additional bound, compare the values against the existing
    // range to see if we can narrow the scope.
        if (null !== n) for (var l = 0; l < t.orderBy.length; ++l) if (t.orderBy[l].field.isEqual(e)) {
        var h = n.position[l];
        Ve({
            value: r,
            inclusive: i
        }, {
            value: h,
            inclusive: n.inclusive
        }) < 0 && (r = h, i = n.inclusive);
        break;
    }
    return {
        value: r,
        inclusive: i
    };
}

/**
 * Returns the value to use as the upper bound for ascending index segment at
 * the provided `fieldPath` (or the lower bound for a descending segment).
 */ function je(t, e, n) {
    // Process all filters to find a value for the current field segment
    for (var r = de, i = !0, o = 0, u = Ke(t, e); o < u.length; o++) {
        var s = u[o], a = de, c = !0;
        switch (s.op) {
          case ">=" /* GREATER_THAN_OR_EQUAL */ :
          case ">" /* GREATER_THAN */ :
            a = Ce(s.value), c = !1;
            break;

          case "==" /* EQUAL */ :
          case "in" /* IN */ :
          case "<=" /* LESS_THAN_OR_EQUAL */ :
            a = s.value;
            break;

          case "<" /* LESS_THAN */ :
            a = s.value, c = !1;
            break;

          case "!=" /* NOT_EQUAL */ :
          case "not-in" /* NOT_IN */ :
            a = de;
            // Remaining filters cannot be used as upper bounds.
                }
        Oe({
            value: r,
            inclusive: i
        }, {
            value: a,
            inclusive: c
        }) > 0 && (r = a, i = c);
    }
    // If there is an additional bound, compare the values against the existing
    // range to see if we can narrow the scope.
        if (null !== n) for (var l = 0; l < t.orderBy.length; ++l) if (t.orderBy[l].field.isEqual(e)) {
        var h = n.position[l];
        Oe({
            value: r,
            inclusive: i
        }, {
            value: h,
            inclusive: n.inclusive
        }) > 0 && (r = h, i = n.inclusive);
        break;
    }
    return {
        value: r,
        inclusive: i
    };
}

/** Returns the number of segments of a perfect index for this target. */ var ze = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).field = t, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e, r) {
        return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.ct(t, e, r) : new Qe(t, e, r) : "array-contains" /* ARRAY_CONTAINS */ === e ? new Je(t, r) : "in" /* IN */ === e ? new Xe(t, r) : "not-in" /* NOT_IN */ === e ? new $e(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Ze(t, r) : new n(t, e, r);
    }, n.ct = function(t, e, n) {
        return "in" /* IN */ === e ? new We(t, n) : new He(t, n);
    }, n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.at(ge(e, this.value)) : null !== e && ve(this.value) === ve(e) && this.at(ge(e, this.value));
        // Only compare types with matching backend order (such as double and int).
        }, n.prototype.at = function(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case "!=" /* NOT_EQUAL */ :
            return 0 !== t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return j();
        }
    }, n.prototype.ht = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
    }, n;
}((function() {})), Qe = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, r) || this).key = mt.fromName(r.referenceValue), 
        i;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = mt.comparator(t.key, this.key);
        return this.at(e);
    }, n;
}(ze), We = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "in" /* IN */ , n) || this).keys = Ye("in" /* IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(ze), He = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "not-in" /* NOT_IN */ , n) || this).keys = Ye("not-in" /* NOT_IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return !this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(ze);

function Ye(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((function(t) {
        return mt.fromName(t.referenceValue);
    }));
}

/** A Filter that implements the array-contains operator. */ var Je = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return Se(e) && me(e.arrayValue, this.value);
    }, n;
}(ze), Xe = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "in" /* IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return null !== e && me(this.value.arrayValue, e);
    }, n;
}(ze), $e = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "not-in" /* NOT_IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        if (me(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        var e = t.data.field(this.field);
        return null !== e && !me(this.value.arrayValue, e);
    }, n;
}(ze), Ze = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = this, n = t.data.field(this.field);
        return !(!Se(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return me(e.value.arrayValue, t);
        }));
    }, n;
}(ze), tn = function(t, e) {
    this.position = t, this.inclusive = e;
}, en = function(t, e /* ASCENDING */) {
    void 0 === e && (e = "asc"), this.field = t, this.dir = e;
};

/** A Filter that implements the IN operator. */ function nn(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

function rn(t, e, n) {
    for (var r = 0, i = 0; i < t.position.length; i++) {
        var o = e[i], u = t.position[i];
        if (r = o.field.isKeyField() ? mt.comparator(mt.fromName(u.referenceValue), n.key) : ge(u, n.data.field(o.field)), 
        "desc" /* DESCENDING */ === o.dir && (r *= -1), 0 !== r) break;
    }
    return r;
}

/**
 * Returns true if a document sorts after a bound using the provided sort
 * order.
 */ function on(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;
    for (var n = 0; n < t.position.length; n++) if (!ye(t.position[n], e.position[n])) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */ var un = 
/**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
function(t, e, n, r, i, o /* First */ , u, s) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === u && (u = null), 
    void 0 === s && (s = null), this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, 
    this.filters = r, this.limit = i, this.limitType = o, this.startAt = u, this.endAt = s, 
    this.lt = null, 
    // The corresponding `Target` of this `Query` instance.
    this.ft = null, this.startAt, this.endAt;
};

/** Creates a new Query instance with the options provided. */ function sn(t, e, n, r, i, o, u, s) {
    return new un(t, e, n, r, i, o, u, s);
}

/** Creates a new Query for a query that matches all documents at `path` */ function an(t) {
    return new un(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */
/**
 * Returns true if this query does not specify any query constraints that
 * could remove results.
 */ function cn(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function ln(t) {
    for (var e = 0, n = t.filters; e < n.length; e++) {
        var r = n[e];
        if (r.ht()) return r.field;
    }
    return null;
}

/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */
/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */ function hn(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */ function fn(t) {
    var e = W(t);
    if (null === e.lt) {
        e.lt = [];
        var n = ln(e), r = cn(e);
        if (null !== n && null === r) 
        // In order to implicitly add key ordering, we must also add the
        // inequality filter field for it to be a valid query.
        // Note that the default inequality field and key ordering is ascending.
        n.isKeyField() || e.lt.push(new en(n)), e.lt.push(new en(yt.keyField(), "asc" /* ASCENDING */)); else {
            for (var i = !1, o = 0, u = e.explicitOrderBy; o < u.length; o++) {
                var s = u[o];
                e.lt.push(s), s.field.isKeyField() && (i = !0);
            }
            if (!i) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                var a = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                e.lt.push(new en(yt.keyField(), a));
            }
        }
    }
    return e.lt;
}

/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */ function dn(t) {
    var e = W(t);
    if (!e.ft) if ("F" /* First */ === e.limitType) e.ft = Pe(e.path, e.collectionGroup, fn(e), e.filters, e.limit, e.startAt, e.endAt); else {
        for (
        // Flip the orderBy directions since we want the last results
        var n = [], r = 0, i = fn(e); r < i.length; r++) {
            var o = i[r], u = "desc" /* DESCENDING */ === o.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
            n.push(new en(o.field, u));
        }
        // We need to swap the cursors to match the now-flipped query ordering.
                var s = e.endAt ? new tn(e.endAt.position, e.endAt.inclusive) : null, a = e.startAt ? new tn(e.startAt.position, e.startAt.inclusive) : null;
        // Now return as a LimitType.First query.
                e.ft = Pe(e.path, e.collectionGroup, n, e.filters, e.limit, s, a);
    }
    return e.ft;
}

function pn(t, e, n) {
    return new un(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function vn(t, e) {
    return Ue(dn(t), dn(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function yn(t) {
    return qe(dn(t)) + "|lt:" + t.limitType;
}

function mn(t) {
    return "Query(target=" + function(t) {
        var e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += ", filters: [" + t.filters.map((function(t) {
            return (e = t).field.canonicalString() + " " + e.op + " " + be(e.value);
            /** Returns a debug description for `filter`. */            var e;
            /** Filter that matches on key fields (i.e. '__name__'). */        })).join(", ") + "]"), 
        le(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += ", orderBy: [" + t.orderBy.map((function(t) {
            return function(t) {
                return t.field.canonicalString() + " (" + t.dir + ")";
            }(t);
        })).join(", ") + "]"), t.startAt && (e += ", startAt: ", e += t.startAt.inclusive ? "b:" : "a:", 
        e += t.startAt.position.map((function(t) {
            return be(t);
        })).join(",")), t.endAt && (e += ", endAt: ", e += t.endAt.inclusive ? "a:" : "b:", 
        e += t.endAt.position.map((function(t) {
            return be(t);
        })).join(",")), "Target(" + e + ")";
    }(dn(t)) + "; limitType=" + t.limitType + ")";
}

/** Returns whether `doc` matches the constraints of `query`. */ function gn(t, e) {
    return e.isFoundDocument() && function(t, e) {
        var n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : mt.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
    }(t, e) && function(t, e) {
        for (var n = 0, r = t.explicitOrderBy; n < r.length; n++) {
            var i = r[n];
            // order by key always matches
                        if (!i.field.isKeyField() && null === e.data.field(i.field)) return !1;
        }
        return !0;
    }(t, e) && function(t, e) {
        for (var n = 0, r = t.filters; n < r.length; n++) {
            if (!r[n].matches(e)) return !1;
        }
        return !0;
    }(t, e) && function(t, e) {
        return !(t.startAt && 
        /**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */
        !function(t, e, n) {
            var r = rn(t, e, n);
            return t.inclusive ? r <= 0 : r < 0;
        }(t.startAt, fn(t), e)) && !(t.endAt && !function(t, e, n) {
            var r = rn(t, e, n);
            return t.inclusive ? r >= 0 : r > 0;
        }(t.endAt, fn(t), e));
    }(t, e);
}

function wn(t) {
    return t.collectionGroup || (t.path.length % 2 == 1 ? t.path.lastSegment() : t.path.get(t.path.length - 2));
}

/**
 * Returns a new comparator function that can be used to compare two documents
 * based on the Query's ordering constraint.
 */ function bn(t) {
    return function(e, n) {
        for (var r = !1, i = 0, o = fn(t); i < o.length; i++) {
            var u = o[i], s = In(u, e, n);
            if (0 !== s) return s;
            r = r || u.field.isKeyField();
        }
        return 0;
    };
}

function In(t, e, n) {
    var r = t.field.isKeyField() ? mt.comparator(e.key, n.key) : function(t, e, n) {
        var r = e.data.field(t), i = n.data.field(t);
        return null !== r && null !== i ? ge(r, i) : j();
    }(t.field, e, n);
    switch (t.dir) {
      case "asc" /* ASCENDING */ :
        return r;

      case "desc" /* DESCENDING */ :
        return -1 * r;

      default:
        return j();
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */ function En(t, e) {
    if (t.dt) {
        if (isNaN(e)) return {
            doubleValue: "NaN"
        };
        if (e === 1 / 0) return {
            doubleValue: "Infinity"
        };
        if (e === -1 / 0) return {
            doubleValue: "-Infinity"
        };
    }
    return {
        doubleValue: he(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function Tn(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function Sn(t, e) {
    return fe(e) ? Tn(e) : En(t, e);
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Used to represent a field transform on a mutation. */ var Dn = function() {
    // Make sure that the structural type of `TransformOperation` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this._ = void 0;
};

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function _n(t, e, n) {
    return t instanceof An ? function(t, e) {
        var n = {
            fields: {
                __type__: {
                    stringValue: "server_timestamp"
                },
                __local_write_time__: {
                    timestampValue: {
                        seconds: t.seconds,
                        nanos: t.nanoseconds
                    }
                }
            }
        };
        return e && (n.fields.__previous_value__ = e), {
            mapValue: n
        };
    }(n, e) : t instanceof kn ? Cn(t, e) : t instanceof Vn ? On(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = Nn(t, e), r = Rn(n) + Rn(t._t);
        return Te(n) && Te(t._t) ? Tn(r) : En(t.wt, r);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function xn(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof kn ? Cn(t, e) : t instanceof Vn ? On(t, e) : n;
}

/**
 * If this transform operation is not idempotent, returns the base value to
 * persist for this transform. If a base value is returned, the transform
 * operation is always applied to this base value, even if document has
 * already been updated.
 *
 * Base values provide consistent behavior for non-idempotent transforms and
 * allow us to return the same latency-compensated value even if the backend
 * has already applied the transform operation. The base value is null for
 * idempotent transforms, as they can be re-played even if the backend has
 * already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent transforms.
 */ function Nn(t, e) {
    return t instanceof Mn ? Te(n = e) || function(t) {
        return !!t && "doubleValue" in t;
    }(n) ? e : {
        integerValue: 0
    } : null;
    var n;
}

/** Transforms a value into a server-generated timestamp. */ var An = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n;
}(Dn), kn = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(Dn);

/** Transforms an array value via a union operation. */ function Cn(t, e) {
    for (var n = Ln(e), r = function(t) {
        n.some((function(e) {
            return ye(e, t);
        })) || n.push(t);
    }, i = 0, o = t.elements; i < o.length; i++) {
        r(o[i]);
    }
    return {
        arrayValue: {
            values: n
        }
    };
}

/** Transforms an array value via a remove operation. */ var Vn = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(Dn);

function On(t, e) {
    for (var n = Ln(e), r = function(t) {
        n = n.filter((function(e) {
            return !ye(e, t);
        }));
    }, i = 0, o = t.elements; i < o.length; i++) {
        r(o[i]);
    }
    return {
        arrayValue: {
            values: n
        }
    };
}

/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */ var Mn = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).wt = t, r._t = n, r;
    }
    return t(n, e), n;
}(Dn);

function Rn(t) {
    return re(t.integerValue || t.doubleValue);
}

function Ln(t) {
    return Se(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A field path and the TransformOperation to perform upon it. */ var Fn = function(t, e) {
    this.field = t, this.transform = e;
};

/** The result of successfully applying a mutation to the backend. */
var Pn = function(
/**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
t, 
/**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */
e) {
    this.version = t, this.transformResults = e;
}, qn = /** @class */ function() {
    function t(t, e) {
        this.updateTime = t, this.exists = e
        /** Creates a new empty Precondition. */;
    }
    return t.none = function() {
        return new t;
    }, 
    /** Creates a new Precondition with an exists flag. */ t.exists = function(e) {
        return new t(void 0, e);
    }, 
    /** Creates a new Precondition based on a version a document exists at. */ t.updateTime = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "isNone", {
        /** Returns whether this Precondition is empty. */ get: function() {
            return void 0 === this.updateTime && void 0 === this.exists;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }, t;
}();

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */
/** Returns true if the preconditions is valid for the given document. */ function Un(t, e) {
    return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument();
}

/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */ var Bn = function() {};

/**
 * A utility method to calculate a `Mutation` representing the overlay from the
 * final state of the document, and a `FieldMask` representing the fields that
 * are mutated by the local mutations.
 */ function Kn(t, e) {
    if (!t.hasLocalMutations || e && 0 === e.fields.length) return null;
    // mask is null when sets or deletes are applied to the current document.
        if (null === e) return t.isNoDocument() ? new tr(t.key, qn.none()) : new Wn(t.key, t.data, qn.none());
    for (var n = t.data, r = Me.empty(), i = new Yt(yt.comparator), o = 0, u = e.fields; o < u.length; o++) {
        var s = u[o];
        if (!i.has(s)) {
            var a = n.field(s);
            // If we are deleting a nested field, we take the immediate parent as
            // the mask used to construct the resulting mutation.
            // Justification: Nested fields can create parent fields implicitly. If
            // only a leaf entry is deleted in later mutations, the parent field
            // should still remain, but we may have lost this information.
            // Consider mutation (foo.bar 1), then mutation (foo.bar delete()).
            // This leaves the final result (foo, {}). Despite the fact that `doc`
            // has the correct result, `foo` is not in `mask`, and the resulting
            // mutation would miss `foo`.
                        null === a && s.length > 1 && (s = s.popLast(), a = n.field(s)), null === a ? r.delete(s) : r.set(s, a), 
            i = i.add(s);
        }
    }
    return new Hn(t.key, r, new $t(i.toArray()), qn.none());
}

/**
 * Applies this mutation to the given document for the purposes of computing a
 * new remote document. If the input document doesn't match the expected state
 * (e.g. it is invalid or outdated), the document type may transition to
 * unknown.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param mutationResult - The result of applying the mutation from the backend.
 */ function Gn(t, e, n) {
    t instanceof Wn ? function(t, e, n) {
        // Unlike setMutationApplyToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        var r = t.value.clone(), i = Jn(t.fieldTransforms, e, n.transformResults);
        r.setAll(i), e.convertToFoundDocument(n.version, r).setHasCommittedMutations();
    }(t, e, n) : t instanceof Hn ? function(t, e, n) {
        if (Un(t.precondition, e)) {
            var r = Jn(t.fieldTransforms, e, n.transformResults), i = e.data;
            i.setAll(Yn(t)), i.setAll(r), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
        } else e.convertToUnknownDocument(n.version);
    }(t, e, n) : function(t, e, n) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        e.convertToNoDocument(n.version).setHasCommittedMutations();
    }(0, e, n);
}

/**
 * Applies this mutation to the given document for the purposes of computing
 * the new local view of a document. If the input document doesn't match the
 * expected state, the document is not modified.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param previousMask - The fields that have been updated before applying this mutation.
 * @param localWriteTime - A timestamp indicating the local write time of the
 *     batch this mutation is a part of.
 * @returns A `FieldMask` representing the fields that are changed by applying this mutation.
 */ function jn(t, e, n, r) {
    return t instanceof Wn ? function(t, e, n, r) {
        if (!Un(t.precondition, e)) 
        // The mutation failed to apply (e.g. a document ID created with add()
        // caused a name collision).
        return n;
        var i = t.value.clone(), o = Xn(t.fieldTransforms, r, e);
        return i.setAll(o), e.convertToFoundDocument(e.version, i).setHasLocalMutations(), 
        null;
        // SetMutation overwrites all fields.
        }(t, e, n, r) : t instanceof Hn ? function(t, e, n, r) {
        if (!Un(t.precondition, e)) return n;
        var i = Xn(t.fieldTransforms, r, e), o = e.data;
        return o.setAll(Yn(t)), o.setAll(i), e.convertToFoundDocument(e.version, o).setHasLocalMutations(), 
        null === n ? null : n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map((function(t) {
            return t.field;
        })));
    }(t, e, n, r) : function(t, e, n) {
        return Un(t.precondition, e) ? (e.convertToNoDocument(e.version).setHasLocalMutations(), 
        null) : n;
    }(t, e, n);
}

/**
 * If this mutation is not idempotent, returns the base value to persist with
 * this mutation. If a base value is returned, the mutation is always applied
 * to this base value, even if document has already been updated.
 *
 * The base value is a sparse object that consists of only the document
 * fields for which this mutation contains a non-idempotent transformation
 * (e.g. a numeric increment). The provided value guarantees consistent
 * behavior for non-idempotent transforms and allow us to return the same
 * latency-compensated value even if the backend has already applied the
 * mutation. The base value is null for idempotent mutations, as they can be
 * re-played even if the backend has already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent mutations.
 */ function zn(t, e) {
    for (var n = null, r = 0, i = t.fieldTransforms; r < i.length; r++) {
        var o = i[r], u = e.data.field(o.field), s = Nn(o.transform, u || null);
        null != s && (null === n && (n = Me.empty()), n.set(o.field, s));
    }
    return n || null;
}

function Qn(t, e) {
    return t.type === e.type && !!t.key.isEqual(e.key) && !!t.precondition.isEqual(e.precondition) && !!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && ct(t, e, (function(t, e) {
            return function(t, e) {
                return t.field.isEqual(e.field) && function(t, e) {
                    return t instanceof kn && e instanceof kn || t instanceof Vn && e instanceof Vn ? ct(t.elements, e.elements, ye) : t instanceof Mn && e instanceof Mn ? ye(t._t, e._t) : t instanceof An && e instanceof An;
                }(t.transform, e.transform);
            }(t, e);
        }));
    }(t.fieldTransforms, e.fieldTransforms) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask));
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ var Wn = /** @class */ function(e) {
    function n(t, n, r, i) {
        void 0 === i && (i = []);
        var o = this;
        return (o = e.call(this) || this).key = t, o.value = n, o.precondition = r, o.fieldTransforms = i, 
        o.type = 0 /* Set */ , o;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return null;
    }, n;
}(Bn), Hn = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        void 0 === o && (o = []);
        var u = this;
        return (u = e.call(this) || this).key = t, u.data = n, u.fieldMask = r, u.precondition = i, 
        u.fieldTransforms = o, u.type = 1 /* Patch */ , u;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return this.fieldMask;
    }, n;
}(Bn);

function Yn(t) {
    var e = new Map;
    return t.fieldMask.fields.forEach((function(n) {
        if (!n.isEmpty()) {
            var r = t.data.field(n);
            e.set(n, r);
        }
    })), e
    /**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use after a mutation
 * containing transforms has been acknowledged by the server.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param mutableDocument - The current state of the document after applying all
 * previous mutations.
 * @param serverTransformResults - The transform results received by the server.
 * @returns The transform results list.
 */;
}

function Jn(t, e, n) {
    var r = new Map;
    z(t.length === n.length);
    for (var i = 0; i < n.length; i++) {
        var o = t[i], u = o.transform, s = e.data.field(o.field);
        r.set(o.field, xn(u, s, n[i]));
    }
    return r;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use when applying a
 * transform locally.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param localWriteTime - The local time of the mutation (used to
 *     generate ServerTimestampValues).
 * @param mutableDocument - The document to apply transforms on.
 * @returns The transform results list.
 */ function Xn(t, e, n) {
    for (var r = new Map, i = 0, o = t; i < o.length; i++) {
        var u = o[i], s = u.transform, a = n.data.field(u.field);
        r.set(u.field, _n(s, a, e));
    }
    return r;
}

/** A mutation that deletes the document at the given key. */ var $n, Zn, tr = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 2 /* Delete */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return null;
    }, n;
}(Bn), er = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 3 /* Verify */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n.prototype.getFieldMask = function() {
        return null;
    }, n;
}(Bn), nr = 
// TODO(b/33078163): just use simplest form of existence filter for now
function(t) {
    this.count = t;
};

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function rr(t) {
    switch (t) {
      default:
        return j();

      case H.CANCELLED:
      case H.UNKNOWN:
      case H.DEADLINE_EXCEEDED:
      case H.RESOURCE_EXHAUSTED:
      case H.INTERNAL:
      case H.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case H.UNAUTHENTICATED:
        return !1;

      case H.INVALID_ARGUMENT:
      case H.NOT_FOUND:
      case H.ALREADY_EXISTS:
      case H.PERMISSION_DENIED:
      case H.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case H.ABORTED:
      case H.OUT_OF_RANGE:
      case H.UNIMPLEMENTED:
      case H.DATA_LOSS:
        return !0;
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */ function ir(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return B("GRPC error has no .code"), H.UNKNOWN;
    switch (t) {
      case $n.OK:
        return H.OK;

      case $n.CANCELLED:
        return H.CANCELLED;

      case $n.UNKNOWN:
        return H.UNKNOWN;

      case $n.DEADLINE_EXCEEDED:
        return H.DEADLINE_EXCEEDED;

      case $n.RESOURCE_EXHAUSTED:
        return H.RESOURCE_EXHAUSTED;

      case $n.INTERNAL:
        return H.INTERNAL;

      case $n.UNAVAILABLE:
        return H.UNAVAILABLE;

      case $n.UNAUTHENTICATED:
        return H.UNAUTHENTICATED;

      case $n.INVALID_ARGUMENT:
        return H.INVALID_ARGUMENT;

      case $n.NOT_FOUND:
        return H.NOT_FOUND;

      case $n.ALREADY_EXISTS:
        return H.ALREADY_EXISTS;

      case $n.PERMISSION_DENIED:
        return H.PERMISSION_DENIED;

      case $n.FAILED_PRECONDITION:
        return H.FAILED_PRECONDITION;

      case $n.ABORTED:
        return H.ABORTED;

      case $n.OUT_OF_RANGE:
        return H.OUT_OF_RANGE;

      case $n.UNIMPLEMENTED:
        return H.UNIMPLEMENTED;

      case $n.DATA_LOSS:
        return H.DATA_LOSS;

      default:
        return j();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Zn = $n || ($n = {}))[Zn.OK = 0] = "OK", Zn[Zn.CANCELLED = 1] = "CANCELLED", 
Zn[Zn.UNKNOWN = 2] = "UNKNOWN", Zn[Zn.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Zn[Zn.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Zn[Zn.NOT_FOUND = 5] = "NOT_FOUND", 
Zn[Zn.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Zn[Zn.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Zn[Zn.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Zn[Zn.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Zn[Zn.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Zn[Zn.ABORTED = 10] = "ABORTED", 
Zn[Zn.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Zn[Zn.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Zn[Zn.INTERNAL = 13] = "INTERNAL", Zn[Zn.UNAVAILABLE = 14] = "UNAVAILABLE", Zn[Zn.DATA_LOSS = 15] = "DATA_LOSS";

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */
var or = /** @class */ function() {
    function t(t, e) {
        this.mapKeyFn = t, this.equalsFn = e, 
        /**
             * The inner map for a key/value pair. Due to the possibility of collisions we
             * keep a list of entries that we do a linear search through to find an actual
             * match. Note that collisions should be rare, so we still expect near
             * constant time lookups in practice.
             */
        this.inner = {}, 
        /** The number of entries stored in the map */
        this.innerSize = 0
        /** Get a value for this key, or undefined if it does not exist. */;
    }
    return t.prototype.get = function(t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r], u = o[0], s = o[1];
            if (this.equalsFn(u, t)) return s;
        }
    }, t.prototype.has = function(t) {
        return void 0 !== this.get(t);
    }, 
    /** Put this key and value in the map. */ t.prototype.set = function(t, e) {
        var n = this.mapKeyFn(t), r = this.inner[n];
        if (void 0 === r) return this.inner[n] = [ [ t, e ] ], void this.innerSize++;
        for (var i = 0; i < r.length; i++) if (this.equalsFn(r[i][0], t)) 
        // This is updating an existing entry and does not increase `innerSize`.
        return void (r[i] = [ t, e ]);
        r.push([ t, e ]), this.innerSize++;
    }, 
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t.prototype.delete = function(t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (this.equalsFn(n[r][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), 
        this.innerSize--, !0;
        return !1;
    }, t.prototype.forEach = function(t) {
        jt(this.inner, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], u = o[0], s = o[1];
                t(u, s);
            }
        }));
    }, t.prototype.isEmpty = function() {
        return zt(this.inner);
    }, t.prototype.size = function() {
        return this.innerSize;
    }, t;
}(), ur = new Qt(mt.comparator);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function sr() {
    return ur;
}

var ar = new Qt(mt.comparator);

function cr() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = ar, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.insert(o.key, o);
    }
    return n;
}

function lr(t) {
    var e = ar;
    return t.forEach((function(t, n) {
        return e = e.insert(t, n.overlayedDocument);
    })), e;
}

function hr() {
    return dr();
}

function fr() {
    return dr();
}

function dr() {
    return new or((function(t) {
        return t.toString();
    }), (function(t, e) {
        return t.isEqual(e);
    }));
}

var pr = new Qt(mt.comparator), vr = new Yt(mt.comparator);

function yr() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = vr, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var mr = new Yt(at);

function gr() {
    return mr;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */ var wr = /** @class */ function() {
    function t(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    r, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, 
        this.resolvedLimboDocuments = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
        return t.createSynthesizedRemoteEventForCurrentChange = function(e, n) {
        var r = new Map;
        return r.set(e, br.createSynthesizedTargetChangeForCurrentChange(e, n)), new t(ft.min(), r, gr(), sr(), yr());
    }, t;
}(), br = /** @class */ function() {
    function t(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    r, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, 
        this.removedDocuments = i
        /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */;
    }
    return t.createSynthesizedTargetChangeForCurrentChange = function(e, n) {
        return new t(te.EMPTY_BYTE_STRING, n, yr(), yr(), yr());
    }, t;
}(), Ir = function(
/** The new document applies to all of these targets. */
t, 
/** The new document is removed from all of these targets. */
e, 
/** The key of the document for this change. */
n, 
/**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
r) {
    this.gt = t, this.removedTargetIds = e, this.key = n, this.yt = r;
}, Er = function(t, e) {
    this.targetId = t, this.It = e;
}, Tr = function(
/** What kind of change occurred to the watch target. */
t, 
/** The target IDs that were added/removed/set. */
e, 
/**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
n
/** An RPC error indicating why the watch failed. */ , r) {
    void 0 === n && (n = te.EMPTY_BYTE_STRING), void 0 === r && (r = null), this.state = t, 
    this.targetIds = e, this.resumeToken = n, this.cause = r;
}, Sr = /** @class */ function() {
    function t() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.Tt = 0, 
        /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
        this.Et = xr(), 
        /** See public getters for explanations of these fields. */
        this.At = te.EMPTY_BYTE_STRING, this.Rt = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.bt = !0;
    }
    return Object.defineProperty(t.prototype, "current", {
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */
        get: function() {
            return this.Rt;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "resumeToken", {
        /** The last resume token sent to us for this target. */ get: function() {
            return this.At;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Pt", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.Tt;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "vt", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.bt;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.Vt = function(t) {
        t.approximateByteSize() > 0 && (this.bt = !0, this.At = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.St = function() {
        var t = yr(), e = yr(), n = yr();
        return this.Et.forEach((function(r, i) {
            switch (i) {
              case 0 /* Added */ :
                t = t.add(r);
                break;

              case 2 /* Modified */ :
                e = e.add(r);
                break;

              case 1 /* Removed */ :
                n = n.add(r);
                break;

              default:
                j();
            }
        })), new br(this.At, this.Rt, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.Dt = function() {
        this.bt = !1, this.Et = xr();
    }, t.prototype.Ct = function(t, e) {
        this.bt = !0, this.Et = this.Et.insert(t, e);
    }, t.prototype.xt = function(t) {
        this.bt = !0, this.Et = this.Et.remove(t);
    }, t.prototype.Nt = function() {
        this.Tt += 1;
    }, t.prototype.kt = function() {
        this.Tt -= 1;
    }, t.prototype.Ot = function() {
        this.bt = !0, this.Rt = !0;
    }, t;
}(), Dr = /** @class */ function() {
    function t(t) {
        this.Mt = t, 
        /** The internal state of all tracked targets. */
        this.Ft = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.$t = sr(), 
        /** A mapping of document keys to their set of target IDs. */
        this.Bt = _r(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.Lt = new Yt(at)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.Ut = function(t) {
        for (var e = 0, n = t.gt; e < n.length; e++) {
            var r = n[e];
            t.yt && t.yt.isFoundDocument() ? this.qt(r, t.yt) : this.Kt(r, t.key, t.yt);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            var u = o[i];
            this.Kt(u, t.key, t.yt);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.Gt = function(t) {
        var e = this;
        this.forEachTarget(t, (function(n) {
            var r = e.Qt(n);
            switch (t.state) {
              case 0 /* NoChange */ :
                e.jt(n) && r.Vt(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.kt(), r.Pt || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.Dt(), r.Vt(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.kt(), r.Pt || e.removeTarget(n);
                break;

              case 3 /* Current */ :
                e.jt(n) && (r.Ot(), r.Vt(t.resumeToken));
                break;

              case 4 /* Reset */ :
                e.jt(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.Wt(n), r.Vt(t.resumeToken));
                break;

              default:
                j();
            }
        }));
    }, 
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    t.prototype.forEachTarget = function(t, e) {
        var n = this;
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Ft.forEach((function(t, r) {
            n.jt(r) && e(r);
        }));
    }, 
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t.prototype.zt = function(t) {
        var e = t.targetId, n = t.It.count, r = this.Ht(e);
        if (r) {
            var i = r.target;
            if (Be(i)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new mt(i.path);
                this.Kt(e, o, Le.newNoDocument(o, ft.min()));
            } else z(1 === n); else this.Jt(e) !== n && (
            // Existence filter mismatch: We reset the mapping and raise a new
            // snapshot with `isFromCache:true`.
            this.Wt(e), this.Lt = this.Lt.add(e));
        }
    }, 
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t.prototype.Yt = function(t) {
        var e = this, n = new Map;
        this.Ft.forEach((function(r, i) {
            var o = e.Ht(i);
            if (o) {
                if (r.current && Be(o.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var u = new mt(o.target.path);
                    null !== e.$t.get(u) || e.Xt(i, u) || e.Kt(i, u, Le.newNoDocument(u, t));
                }
                r.vt && (n.set(i, r.St()), r.Dt());
            }
        }));
        var r = yr();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.Bt.forEach((function(t, n) {
            var i = !0;
            n.forEachWhile((function(t) {
                var n = e.Ht(t);
                return !n || 2 /* LimboResolution */ === n.purpose || (i = !1, !1);
            })), i && (r = r.add(t));
        })), this.$t.forEach((function(e, n) {
            return n.setReadTime(t);
        }));
        var i = new wr(t, n, this.Lt, this.$t, r);
        return this.$t = sr(), this.Bt = _r(), this.Lt = new Yt(at), i;
    }, 
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t.prototype.qt = function(t, e) {
        if (this.jt(t)) {
            var n = this.Xt(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.Qt(t).Ct(e.key, n), this.$t = this.$t.insert(e.key, e), this.Bt = this.Bt.insert(e.key, this.Zt(e.key).add(t));
        }
    }, 
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    t.prototype.Kt = function(t, e, n) {
        if (this.jt(t)) {
            var r = this.Qt(t);
            this.Xt(t, e) ? r.Ct(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            r.xt(e), this.Bt = this.Bt.insert(e, this.Zt(e).delete(t)), n && (this.$t = this.$t.insert(e, n));
        }
    }, t.prototype.removeTarget = function(t) {
        this.Ft.delete(t);
    }, 
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t.prototype.Jt = function(t) {
        var e = this.Qt(t).St();
        return this.Mt.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size;
    }, 
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t.prototype.Nt = function(t) {
        this.Qt(t).Nt();
    }, t.prototype.Qt = function(t) {
        var e = this.Ft.get(t);
        return e || (e = new Sr, this.Ft.set(t, e)), e;
    }, t.prototype.Zt = function(t) {
        var e = this.Bt.get(t);
        return e || (e = new Yt(at), this.Bt = this.Bt.insert(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.jt = function(t) {
        var e = null !== this.Ht(t);
        return e || U("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.Ht = function(t) {
        var e = this.Ft.get(t);
        return e && e.Pt ? null : this.Mt.te(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.Wt = function(t) {
        var e = this;
        this.Ft.set(t, new Sr), this.Mt.getRemoteKeysForTarget(t).forEach((function(n) {
            e.Kt(t, n, /*updatedDocument=*/ null);
        }));
    }, 
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t.prototype.Xt = function(t, e) {
        return this.Mt.getRemoteKeysForTarget(t).has(e);
    }, t;
}();

/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */ function _r() {
    return new Qt(mt.comparator);
}

function xr() {
    return new Qt(mt.comparator);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Nr = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, Ar = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}, kr = function(t, e) {
    this.databaseId = t, this.dt = e;
};

/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */
function Cr(t, e) {
    return t.dt ? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + e.nanoseconds).slice(-9) + "Z" : {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */ function Vr(t, e) {
    return t.dt ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function Or(t, e) {
    return Cr(t, e.toTimestamp());
}

function Mr(t) {
    return z(!!t), ft.fromTimestamp(function(t) {
        var e = ne(t);
        return new ht(e.seconds, e.nanos);
    }(t));
}

function Rr(t, e) {
    return function(t) {
        return new pt([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).canonicalString();
}

function Lr(t) {
    var e = pt.fromString(t);
    return z(ii(e)), e;
}

function Fr(t, e) {
    return Rr(t.databaseId, e.path);
}

function Pr(t, e) {
    var n = Lr(e);
    if (n.get(1) !== t.databaseId.projectId) throw new Y(H.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new Y(H.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new mt(Kr(n));
}

function qr(t, e) {
    return Rr(t.databaseId, e);
}

function Ur(t) {
    var e = Lr(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? pt.emptyPath() : Kr(e);
}

function Br(t) {
    return new pt([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function Kr(t) {
    return z(t.length > 4 && "documents" === t.get(4)), t.popFirst(5)
    /** Creates a Document proto from key and fields (but no create/update time) */;
}

function Gr(t, e, n) {
    return {
        name: Fr(t, e),
        fields: n.value.mapValue.fields
    };
}

function jr(t, e, n) {
    var r = Pr(t, e.name), i = Mr(e.updateTime), o = new Me({
        mapValue: {
            fields: e.fields
        }
    }), u = Le.newFoundDocument(r, i, o);
    return n && u.setHasCommittedMutations(), n ? u.setHasCommittedMutations() : u;
}

function zr(t, e) {
    var n;
    if (e instanceof Wn) n = {
        update: Gr(t, e.key, e.value)
    }; else if (e instanceof tr) n = {
        delete: Fr(t, e.key)
    }; else if (e instanceof Hn) n = {
        update: Gr(t, e.key, e.data),
        updateMask: ri(e.fieldMask)
    }; else {
        if (!(e instanceof er)) return j();
        n = {
            verify: Fr(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((function(t) {
        return function(t, e) {
            var n = e.transform;
            if (n instanceof An) return {
                fieldPath: e.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof kn) return {
                fieldPath: e.field.canonicalString(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof Vn) return {
                fieldPath: e.field.canonicalString(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof Mn) return {
                fieldPath: e.field.canonicalString(),
                increment: n._t
            };
            throw j();
        }(0, t);
    }))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: Or(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : j();
    }(t, e.precondition)), n;
}

function Qr(t, e) {
    var n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? qn.updateTime(Mr(t.updateTime)) : void 0 !== t.exists ? qn.exists(t.exists) : qn.none();
    }(e.currentDocument) : qn.none(), r = e.updateTransforms ? e.updateTransforms.map((function(e) {
        return function(t, e) {
            var n = null;
            if ("setToServerValue" in e) z("REQUEST_TIME" === e.setToServerValue), n = new An; else if ("appendMissingElements" in e) {
                var r = e.appendMissingElements.values || [];
                n = new kn(r);
            } else if ("removeAllFromArray" in e) {
                var i = e.removeAllFromArray.values || [];
                n = new Vn(i);
            } else "increment" in e ? n = new Mn(t, e.increment) : j();
            var o = yt.fromServerFormat(e.fieldPath);
            return new Fn(o, n);
        }(t, e);
    })) : [];
    if (e.update) {
        e.update.name;
        var i = Pr(t, e.update.name), o = new Me({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            var u = function(t) {
                var e = t.fieldPaths || [];
                return new $t(e.map((function(t) {
                    return yt.fromServerFormat(t);
                })));
            }(e.updateMask);
            return new Hn(i, o, u, n, r);
        }
        return new Wn(i, o, n, r);
    }
    if (e.delete) {
        var s = Pr(t, e.delete);
        return new tr(s, n);
    }
    if (e.verify) {
        var a = Pr(t, e.verify);
        return new er(a, n);
    }
    return j();
}

function Wr(t, e) {
    return {
        documents: [ qr(t, e.path) ]
    };
}

function Hr(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var n = {
        structuredQuery: {}
    }, r = e.path;
    null !== e.collectionGroup ? (n.parent = qr(t, r), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = qr(t, r.popLast()), n.structuredQuery.from = [ {
        collectionId: r.lastSegment()
    } ]);
    var i = function(t) {
        if (0 !== t.length) {
            var e = t.map((function(t) {
                // visible for testing
                return function(t) {
                    if ("==" /* EQUAL */ === t.op) {
                        if (_e(t.value)) return {
                            unaryFilter: {
                                field: Zr(t.field),
                                op: "IS_NAN"
                            }
                        };
                        if (De(t.value)) return {
                            unaryFilter: {
                                field: Zr(t.field),
                                op: "IS_NULL"
                            }
                        };
                    } else if ("!=" /* NOT_EQUAL */ === t.op) {
                        if (_e(t.value)) return {
                            unaryFilter: {
                                field: Zr(t.field),
                                op: "IS_NOT_NAN"
                            }
                        };
                        if (De(t.value)) return {
                            unaryFilter: {
                                field: Zr(t.field),
                                op: "IS_NOT_NULL"
                            }
                        };
                    }
                    return {
                        fieldFilter: {
                            field: Zr(t.field),
                            op: $r(t.op),
                            value: t.value
                        }
                    };
                }(t);
            }));
            return 1 === e.length ? e[0] : {
                compositeFilter: {
                    op: "AND",
                    filters: e
                }
            };
        }
    }(e.filters);
    i && (n.structuredQuery.where = i);
    var o = function(t) {
        if (0 !== t.length) return t.map((function(t) {
            // visible for testing
            return function(t) {
                return {
                    field: Zr(t.field),
                    direction: Xr(t.dir)
                };
            }(t);
        }));
    }(e.orderBy);
    o && (n.structuredQuery.orderBy = o);
    var u, s = function(t, e) {
        return t.dt || le(e) ? e : {
            value: e
        };
    }(t, e.limit);
    return null !== s && (n.structuredQuery.limit = s), e.startAt && (n.structuredQuery.startAt = {
        before: (u = e.startAt).inclusive,
        values: u.position
    }), e.endAt && (n.structuredQuery.endAt = function(t) {
        return {
            before: !t.inclusive,
            values: t.position
        };
    }(e.endAt)), n;
}

function Yr(t) {
    var e = Ur(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
    if (r > 0) {
        z(1 === r);
        var o = n.from[0];
        o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
    }
    var u = [];
    n.where && (u = Jr(n.where));
    var s = [];
    n.orderBy && (s = n.orderBy.map((function(t) {
        return function(t) {
            return new en(ti(t.field), 
            // visible for testing
            function(t) {
                switch (t) {
                  case "ASCENDING":
                    return "asc" /* ASCENDING */;

                  case "DESCENDING":
                    return "desc" /* DESCENDING */;

                  default:
                    return;
                }
            }(t.direction));
        }(t);
    })));
    var a = null;
    n.limit && (a = function(t) {
        var e;
        return le(e = "object" == typeof t ? t.value : t) ? null : e;
    }(n.limit));
    var c = null;
    n.startAt && (c = function(t) {
        var e = !!t.before, n = t.values || [];
        return new tn(n, e);
    }(n.startAt));
    var l = null;
    return n.endAt && (l = function(t) {
        var e = !t.before, n = t.values || [];
        return new tn(n, e);
    }(n.endAt)), sn(e, i, s, u, a, "F" /* First */ , c, l);
}

function Jr(t) {
    return t ? void 0 !== t.unaryFilter ? [ ni(t) ] : void 0 !== t.fieldFilter ? [ ei(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((function(t) {
        return Jr(t);
    })).reduce((function(t, e) {
        return t.concat(e);
    })) : j() : [];
}

function Xr(t) {
    return Nr[t];
}

function $r(t) {
    return Ar[t];
}

function Zr(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function ti(t) {
    return yt.fromServerFormat(t.fieldPath);
}

function ei(t) {
    return ze.create(ti(t.fieldFilter.field), function(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "NOT_EQUAL":
            return "!=" /* NOT_EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "NOT_IN":
            return "not-in" /* NOT_IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          default:
            return j();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function ni(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        var e = ti(t.unaryFilter.field);
        return ze.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        var n = ti(t.unaryFilter.field);
        return ze.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "IS_NOT_NAN":
        var r = ti(t.unaryFilter.field);
        return ze.create(r, "!=" /* NOT_EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NOT_NULL":
        var i = ti(t.unaryFilter.field);
        return ze.create(i, "!=" /* NOT_EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      default:
        return j();
    }
}

function ri(t) {
    var e = [];
    return t.fields.forEach((function(t) {
        return e.push(t.canonicalString());
    })), {
        fieldPaths: e
    };
}

function ii(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */ function oi(t) {
    for (var e = "", n = 0; n < t.length; n++) e.length > 0 && (e = si(e)), e = ui(t.get(n), e);
    return si(e);
}

/** Encodes a single segment of a resource path into the given result */ function ui(t, e) {
    for (var n = e, r = t.length, i = 0; i < r; i++) {
        var o = t.charAt(i);
        switch (o) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += o;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function si(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function ai(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    var e = t.length;
    if (z(e >= 2), 2 === e) return z("" === t.charAt(0) && "" === t.charAt(1)), pt.emptyPath();
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        var u = t.indexOf("", o);
        switch ((u < 0 || u > n) && j(), t.charAt(u + 1)) {
          case "":
            var s = t.substring(o, u), a = void 0;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            a = s : (a = i += s, i = ""), r.push(a);
            break;

          case "":
            i += t.substring(o, u), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(o, u + 1);
            break;

          default:
            j();
        }
        o = u + 2;
    }
    return new pt(r);
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ci = [ "userId", "batchId" ];

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
/**
 * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
 * index to iterate over all at document mutations for a given path or lower.
 */ function li(t, e) {
    return [ t, oi(e) ];
}

/**
 * Creates a full index key of [userId, encodedPath, batchId] for inserting
 * and deleting into the DbDocumentMutations index.
 */ function hi(t, e, n) {
    return [ t, oi(e), n ];
}

/**
 * Because we store all the useful information for this store in the key,
 * there is no useful information to store as the value. The raw (unencoded)
 * path cannot be stored because IndexedDb doesn't store prototype
 * information.
 */ var fi = {}, di = [ "prefixPath", "collectionGroup", "readTime", "documentId" ], pi = [ "prefixPath", "collectionGroup", "documentId" ], vi = [ "collectionGroup", "readTime", "prefixPath", "documentId" ], yi = [ "canonicalId", "targetId" ], mi = [ "targetId", "path" ], gi = [ "path", "targetId" ], wi = [ "collectionId", "parent" ], bi = [ "indexId", "uid" ], Ii = [ "uid", "sequenceNumber" ], Ei = [ "indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey" ], Ti = [ "indexId", "uid", "orderedDocumentKey" ], Si = [ "userId", "collectionPath", "documentId" ], Di = [ "userId", "collectionPath", "largestBatchId" ], _i = [ "userId", "collectionGroup", "largestBatchId" ], xi = r(r([], r(r([], r(r([], r(r([], [ "mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments" ]), [ "clientMetadata" ])), [ "remoteDocumentGlobal" ])), [ "collectionParents" ])), [ "bundles", "namedQueries" ]), Ni = r(r([], xi), [ "documentOverlays" ]), Ai = [ "mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays" ], ki = Ai, Ci = r(r([], ki), [ "indexConfiguration", "indexState", "indexEntries" ]), Vi = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).ee = t, r.currentSequenceNumber = n, r;
    }
    return t(n, e), n;
}(Nt);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Oi(t, e) {
    var n = W(t);
    return Vt.N(n.ee, e);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A batch of mutations that will be sent as one unit to the backend.
 */ var Mi = /** @class */ function() {
    /**
     * @param batchId - The unique ID of this mutation batch.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations - The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    function t(t, e, n, r) {
        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = r
        /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */;
    }
    return t.prototype.applyToRemoteDocument = function(t, e) {
        for (var n = e.mutationResults, r = 0; r < this.mutations.length; r++) {
            var i = this.mutations[r];
            i.key.isEqual(t.key) && Gn(i, t, n[r]);
        }
    }, 
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     * @param mutatedFields - Fields that have been updated before applying this mutation batch.
     * @returns A `FieldMask` representing all the fields that are mutated.
     */
    t.prototype.applyToLocalView = function(t, e) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (var n = 0, r = this.baseMutations; n < r.length; n++) {
            var i = r[n];
            i.key.isEqual(t.key) && (e = jn(i, t, e, this.localWriteTime));
        }
        // Second, apply all user-provided mutations.
                for (var o = 0, u = this.mutations; o < u.length; o++) {
            var s = u[o];
            s.key.isEqual(t.key) && (e = jn(s, t, e, this.localWriteTime));
        }
        return e;
    }, 
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch. Returns a `DocumentKey` to `Mutation` map which can be used to
     * replace all the mutation applications.
     */
    t.prototype.applyToLocalDocumentSet = function(t, e) {
        var n = this, r = fr();
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
                return this.mutations.forEach((function(i) {
            var o = t.get(i.key), u = o.overlayedDocument, s = n.applyToLocalView(u, o.mutatedFields), a = Kn(u, 
            // Set mutatedFields to null if the document is only from local mutations.
            // This creates a Set or Delete mutation, instead of trying to create a
            // patch mutation as the overlay.
            s = e.has(i.key) ? null : s);
            // TODO(mutabledocuments): This method should take a MutableDocumentMap
            // and we should remove this cast.
                        null !== a && r.set(i.key, a), u.isValidDocument() || u.convertToNoDocument(ft.min());
        })), r;
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), yr());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && ct(this.mutations, t.mutations, (function(t, e) {
            return Qn(t, e);
        })) && ct(this.baseMutations, t.baseMutations, (function(t, e) {
            return Qn(t, e);
        }));
    }, t;
}(), Ri = /** @class */ function() {
    function t(t, e, n, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    r) {
        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = r
        /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */;
    }
    return t.from = function(e, n, r) {
        z(e.mutations.length === r.length);
        for (var i = pr, o = e.mutations, u = 0; u < o.length; u++) i = i.insert(o[u].key, r[u].version);
        return new t(e, n, r, i);
    }, t;
}(), Li = /** @class */ function() {
    function t(t, e) {
        this.largestBatchId = t, this.mutation = e;
    }
    return t.prototype.getKey = function() {
        return this.mutation.key;
    }, t.prototype.isEqual = function(t) {
        return null !== t && this.mutation === t.mutation;
    }, t.prototype.toString = function() {
        return "Overlay{\n      largestBatchId: " + this.largestBatchId + ",\n      mutation: " + this.mutation.toString() + "\n    }";
    }, t;
}(), Fi = /** @class */ function() {
    function t(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    r, 
    /** The latest snapshot version seen for this target. */
    i
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , o
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , u) {
        void 0 === i && (i = ft.min()), void 0 === o && (o = ft.min()), void 0 === u && (u = te.EMPTY_BYTE_STRING), 
        this.target = t, this.targetId = e, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, 
        this.lastLimboFreeSnapshotVersion = o, this.resumeToken = u;
    }
    /** Creates a new target data instance with an updated sequence number. */    return t.prototype.withSequenceNumber = function(e) {
        return new t(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }, 
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t.prototype.withResumeToken = function(e, n) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e);
    }, 
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t.prototype.withLastLimboFreeSnapshotVersion = function(e) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken);
    }, t;
}(), Pi = function(t) {
    this.ne = t;
};

/** The result of applying a mutation batch to the backend. */
/** Encodes a document for storage locally. */ function qi(t, e) {
    var n = e.key, r = {
        prefixPath: n.getCollectionPath().popLast().toArray(),
        collectionGroup: n.collectionGroup,
        documentId: n.path.lastSegment(),
        readTime: Ui(e.readTime),
        hasCommittedMutations: e.hasCommittedMutations
    };
    if (e.isFoundDocument()) r.document = function(t, e) {
        return {
            name: Fr(t, e.key),
            fields: e.data.value.mapValue.fields,
            updateTime: Cr(t, e.version.toTimestamp())
        };
    }(t.ne, e); else if (e.isNoDocument()) r.noDocument = {
        path: n.path.toArray(),
        readTime: Bi(e.version)
    }; else {
        if (!e.isUnknownDocument()) return j();
        r.unknownDocument = {
            path: n.path.toArray(),
            version: Bi(e.version)
        };
    }
    return r;
}

function Ui(t) {
    var e = t.toTimestamp();
    return [ e.seconds, e.nanoseconds ];
}

function Bi(t) {
    var e = t.toTimestamp();
    return {
        seconds: e.seconds,
        nanoseconds: e.nanoseconds
    };
}

function Ki(t) {
    var e = new ht(t.seconds, t.nanoseconds);
    return ft.fromTimestamp(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */ function Gi(t, e) {
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
    for (var n = (e.baseMutations || []).map((function(e) {
        return Qr(t.ne, e);
    })), r = 0; r < e.mutations.length - 1; ++r) {
        var i = e.mutations[r];
        if (r + 1 < e.mutations.length && void 0 !== e.mutations[r + 1].transform) {
            var o = e.mutations[r + 1];
            i.updateTransforms = o.transform.fieldTransforms, e.mutations.splice(r + 1, 1), 
            ++r;
        }
    }
    var u = e.mutations.map((function(e) {
        return Qr(t.ne, e);
    })), s = ht.fromMillis(e.localWriteTimeMs);
    return new Mi(e.batchId, s, n, u);
}

/** Decodes a DbTarget into TargetData */ function ji(t) {
    var e, n, r = Ki(t.readTime), i = void 0 !== t.lastLimboFreeSnapshotVersion ? Ki(t.lastLimboFreeSnapshotVersion) : ft.min();
    return void 0 !== t.query.documents ? (z(1 === (n = t.query).documents.length), 
    e = dn(an(Ur(n.documents[0])))) : e = function(t) {
        return dn(Yr(t));
    }(t.query), new Fi(e, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, r, i, te.fromBase64String(t.resumeToken))
    /** Encodes TargetData into a DbTarget for storage locally. */;
}

function zi(t, e) {
    var n, r = Bi(e.snapshotVersion), i = Bi(e.lastLimboFreeSnapshotVersion);
    n = Be(e.target) ? Wr(t.ne, e.target) : Hr(t.ne, e.target);
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
    var o = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return {
        targetId: e.targetId,
        canonicalId: qe(e.target),
        readTime: r,
        resumeToken: o,
        lastListenSequenceNumber: e.sequenceNumber,
        lastLimboFreeSnapshotVersion: i,
        query: n
    };
}

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */ function Qi(t) {
    var e = Yr({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? pn(e, e.limit, "L" /* Last */) : e;
}

/** Encodes a NamedQuery proto object to a NamedQuery model object. */
/** Encodes a DbDocumentOverlay object to an Overlay model object. */ function Wi(t, e) {
    return new Li(e.largestBatchId, Qr(t.ne, e.overlayMutation));
}

/** Decodes an Overlay model object into a DbDocumentOverlay object. */
/**
 * Returns the DbDocumentOverlayKey corresponding to the given user and
 * document key.
 */ function Hi(t, e) {
    var n = e.path.lastSegment();
    return [ t, oi(e.path.popLast()), n ];
}

function Yi(t, e, n, r) {
    return {
        indexId: t,
        uid: e.uid || "",
        sequenceNumber: n,
        readTime: Bi(r.readTime),
        documentKey: oi(r.documentKey.path),
        largestBatchId: r.largestBatchId
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ji = /** @class */ function() {
    function t() {}
    return t.prototype.getBundleMetadata = function(t, e) {
        return Xi(t).get(e).next((function(t) {
            if (t) return {
                id: (e = t).bundleId,
                createTime: Ki(e.createTime),
                version: e.version
            };
            /** Encodes a DbBundle to a BundleMetadata object. */            var e;
            /** Encodes a BundleMetadata to a DbBundle. */        }));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        return Xi(t).put({
            bundleId: (n = e).id,
            createTime: Bi(Mr(n.createTime)),
            version: n.version
        });
        var n;
        /** Encodes a DbNamedQuery to a NamedQuery. */    }, t.prototype.getNamedQuery = function(t, e) {
        return $i(t).get(e).next((function(t) {
            if (t) return {
                name: (e = t).name,
                query: Qi(e.bundledQuery),
                readTime: Ki(e.readTime)
            };
            var e;
            /** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */        }));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return $i(t).put(function(t) {
            return {
                name: t.name,
                readTime: Bi(Mr(t.readTime)),
                bundledQuery: t.bundledQuery
            };
        }(e));
    }, t;
}();

/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */ function Xi(t) {
    return Oi(t, "bundles");
}

/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */ function $i(t) {
    return Oi(t, "namedQueries");
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Implementation of DocumentOverlayCache using IndexedDb.
 */ var Zi = /** @class */ function() {
    /**
     * @param serializer - The document serializer.
     * @param userId - The userId for which we are accessing overlays.
     */
    function t(t, e) {
        this.wt = t, this.userId = e;
    }
    return t.se = function(e, n) {
        return new t(e, n.uid || "");
    }, t.prototype.getOverlay = function(t, e) {
        var n = this;
        return to(t).get(Hi(this.userId, e)).next((function(t) {
            return t ? Wi(n.wt, t) : null;
        }));
    }, t.prototype.getOverlays = function(t, e) {
        var n = this, r = hr();
        return kt.forEach(e, (function(e) {
            return n.getOverlay(t, e).next((function(t) {
                null !== t && r.set(e, t);
            }));
        })).next((function() {
            return r;
        }));
    }, t.prototype.saveOverlays = function(t, e, n) {
        var r = this, i = [];
        return n.forEach((function(n, o) {
            var u = new Li(e, o);
            i.push(r.ie(t, u));
        })), kt.waitFor(i);
    }, t.prototype.removeOverlaysForBatchId = function(t, e, n) {
        var r = this, i = new Set;
        // Get the set of unique collection paths.
        e.forEach((function(t) {
            return i.add(oi(t.getCollectionPath()));
        }));
        var o = [];
        return i.forEach((function(e) {
            var i = IDBKeyRange.bound([ r.userId, e, n ], [ r.userId, e, n + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            o.push(to(t).W("collectionPathOverlayIndex", i));
        })), kt.waitFor(o);
    }, t.prototype.getOverlaysForCollection = function(t, e, n) {
        var r = this, i = hr(), o = oi(e), u = IDBKeyRange.bound([ this.userId, o, n ], [ this.userId, o, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return to(t).K("collectionPathOverlayIndex", u).next((function(t) {
            for (var e = 0, n = t; e < n.length; e++) {
                var o = n[e], u = Wi(r.wt, o);
                i.set(u.getKey(), u);
            }
            return i;
        }));
    }, t.prototype.getOverlaysForCollectionGroup = function(t, e, n, r) {
        var i, o = this, u = hr(), s = IDBKeyRange.bound([ this.userId, e, n ], [ this.userId, e, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return to(t).J({
            index: "collectionGroupOverlayIndex",
            range: s
        }, (function(t, e, n) {
            // We do not want to return partial batch overlays, even if the size
            // of the result set exceeds the given `count` argument. Therefore, we
            // continue to aggregate results even after the result size exceeds
            // `count` if there are more overlays from the `currentBatchId`.
            var s = Wi(o.wt, e);
            u.size() < r || s.largestBatchId === i ? (u.set(s.getKey(), s), i = s.largestBatchId) : n.done();
        })).next((function() {
            return u;
        }));
    }, t.prototype.ie = function(t, e) {
        return to(t).put(function(t, e, n) {
            var r = Hi(e, n.mutation.key);
            return r[0], {
                userId: e,
                collectionPath: r[1],
                documentId: r[2],
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: zr(t.ne, n.mutation)
            };
        }(this.wt, this.userId, e));
    }, t;
}();

/**
 * Helper to get a typed SimpleDbStore for the document overlay object store.
 */ function to(t) {
    return Oi(t, "documentOverlays");
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Note: This code is copied from the backend. Code that is not used by
// Firestore was removed.
/** Firestore index value writer.  */ var eo = /** @class */ function() {
    function t() {}
    // The write methods below short-circuit writing terminators for values
    // containing a (terminating) truncated value.
    // As an example, consider the resulting encoding for:
    // ["bar", [2, "foo"]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TERM, TERM, TERM)
    // ["bar", [2, truncated("foo")]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TRUNC)
    // ["bar", truncated(["foo"])] -> (STRING, "bar", TERM, ARRAY. STRING, "foo", TERM, TRUNC)
    /** Writes an index value.  */    return t.prototype.re = function(t, e) {
        this.oe(t, e), 
        // Write separator to split index values
        // (see go/firestore-storage-format#encodings).
        e.ue();
    }, t.prototype.oe = function(t, e) {
        if ("nullValue" in t) this.ce(e, 5); else if ("booleanValue" in t) this.ce(e, 10), 
        e.ae(t.booleanValue ? 1 : 0); else if ("integerValue" in t) this.ce(e, 15), e.ae(re(t.integerValue)); else if ("doubleValue" in t) {
            var n = re(t.doubleValue);
            isNaN(n) ? this.ce(e, 13) : (this.ce(e, 15), he(n) ? 
            // -0.0, 0 and 0.0 are all considered the same
            e.ae(0) : e.ae(n));
        } else if ("timestampValue" in t) {
            var r = t.timestampValue;
            this.ce(e, 20), "string" == typeof r ? e.he(r) : (e.he("" + (r.seconds || "")), 
            e.ae(r.nanos || 0));
        } else if ("stringValue" in t) this.le(t.stringValue, e), this.fe(e); else if ("bytesValue" in t) this.ce(e, 30), 
        e.de(ie(t.bytesValue)), this.fe(e); else if ("referenceValue" in t) this._e(t.referenceValue, e); else if ("geoPointValue" in t) {
            var i = t.geoPointValue;
            this.ce(e, 45), e.ae(i.latitude || 0), e.ae(i.longitude || 0);
        } else "mapValue" in t ? Ae(t) ? this.ce(e, Number.MAX_SAFE_INTEGER) : (this.we(t.mapValue, e), 
        this.fe(e)) : "arrayValue" in t ? (this.me(t.arrayValue, e), this.fe(e)) : j();
    }, t.prototype.le = function(t, e) {
        this.ce(e, 25), this.ge(t, e);
    }, t.prototype.ge = function(t, e) {
        e.he(t);
    }, t.prototype.we = function(t, e) {
        var n = t.fields || {};
        this.ce(e, 55);
        for (var r = 0, i = Object.keys(n); r < i.length; r++) {
            var o = i[r];
            this.le(o, e), this.oe(n[o], e);
        }
    }, t.prototype.me = function(t, e) {
        var n = t.values || [];
        this.ce(e, 50);
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            this.oe(o, e);
        }
    }, t.prototype._e = function(t, e) {
        var n = this;
        this.ce(e, 37), mt.fromName(t).path.forEach((function(t) {
            n.ce(e, 60), n.ge(t, e);
        }));
    }, t.prototype.ce = function(t, e) {
        t.ae(e);
    }, t.prototype.fe = function(t) {
        // While the SDK does not implement truncation, the truncation marker is
        // used to terminate all variable length values (which are strings, bytes,
        // references, arrays and maps).
        t.ae(2);
    }, t;
}();

/**
 * Counts the number of zeros in a byte.
 *
 * Visible for testing.
 */
function no(t) {
    if (0 === t) return 8;
    var e = 0;
    return t >> 4 == 0 && (
    // Test if the first four bits are zero.
    e += 4, t <<= 4), t >> 6 == 0 && (
    // Test if the first two (or next two) bits are zero.
    e += 2, t <<= 2), t >> 7 == 0 && (
    // Test if the remaining bit is zero.
    e += 1), e
    /** Counts the number of leading zeros in the given byte array. */
    /**
 * Returns the number of bytes required to store "value". Leading zero bytes
 * are skipped.
 */;
}

function ro(t) {
    // This is just the number of bytes for the unsigned representation of the number.
    var e = 64 - function(t) {
        for (var e = 0, n = 0; n < 8; ++n) {
            var r = no(255 & t[n]);
            if (e += r, 8 !== r) break;
        }
        return e;
    }(t);
    return Math.ceil(e / 8);
}

/**
 * OrderedCodeWriter is a minimal-allocation implementation of the writing
 * behavior defined by the backend.
 *
 * The code is ported from its Java counterpart.
 */ eo.ye = new eo;

var io = /** @class */ function() {
    function t() {
        this.buffer = new Uint8Array(1024), this.position = 0;
    }
    return t.prototype.pe = function(t) {
        for (var e = t[Symbol.iterator](), n = e.next(); !n.done; ) this.Ie(n.value), n = e.next();
        this.Te();
    }, t.prototype.Ee = function(t) {
        for (var e = t[Symbol.iterator](), n = e.next(); !n.done; ) this.Ae(n.value), n = e.next();
        this.Re();
    }, 
    /** Writes utf8 bytes into this byte sequence, ascending. */ t.prototype.be = function(t) {
        for (var e = 0, n = t; e < n.length; e++) {
            var r = n[e], i = r.charCodeAt(0);
            if (i < 128) this.Ie(i); else if (i < 2048) this.Ie(960 | i >>> 6), this.Ie(128 | 63 & i); else if (r < "\ud800" || "\udbff" < r) this.Ie(480 | i >>> 12), 
            this.Ie(128 | 63 & i >>> 6), this.Ie(128 | 63 & i); else {
                var o = r.codePointAt(0);
                this.Ie(240 | o >>> 18), this.Ie(128 | 63 & o >>> 12), this.Ie(128 | 63 & o >>> 6), 
                this.Ie(128 | 63 & o);
            }
        }
        this.Te();
    }, 
    /** Writes utf8 bytes into this byte sequence, descending */ t.prototype.Pe = function(t) {
        for (var e = 0, n = t; e < n.length; e++) {
            var r = n[e], i = r.charCodeAt(0);
            if (i < 128) this.Ae(i); else if (i < 2048) this.Ae(960 | i >>> 6), this.Ae(128 | 63 & i); else if (r < "\ud800" || "\udbff" < r) this.Ae(480 | i >>> 12), 
            this.Ae(128 | 63 & i >>> 6), this.Ae(128 | 63 & i); else {
                var o = r.codePointAt(0);
                this.Ae(240 | o >>> 18), this.Ae(128 | 63 & o >>> 12), this.Ae(128 | 63 & o >>> 6), 
                this.Ae(128 | 63 & o);
            }
        }
        this.Re();
    }, t.prototype.ve = function(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // actual value in big-endian format with leading 0 bytes dropped.
        var e = this.Ve(t), n = ro(e);
        this.Se(1 + n), this.buffer[this.position++] = 255 & n;
        // Write the length
        for (var r = e.length - n; r < e.length; ++r) this.buffer[this.position++] = 255 & e[r];
    }, t.prototype.De = function(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // inverted value in big-endian format with leading 0 bytes dropped.
        var e = this.Ve(t), n = ro(e);
        this.Se(1 + n), this.buffer[this.position++] = ~(255 & n);
        // Write the length
        for (var r = e.length - n; r < e.length; ++r) this.buffer[this.position++] = ~(255 & e[r]);
    }, 
    /**
     * Writes the "infinity" byte sequence that sorts after all other byte
     * sequences written in ascending order.
     */
    t.prototype.Ce = function() {
        this.xe(255), this.xe(255);
    }, 
    /**
     * Writes the "infinity" byte sequence that sorts before all other byte
     * sequences written in descending order.
     */
    t.prototype.Ne = function() {
        this.ke(255), this.ke(255);
    }, 
    /**
     * Resets the buffer such that it is the same as when it was newly
     * constructed.
     */
    t.prototype.reset = function() {
        this.position = 0;
    }, t.prototype.seed = function(t) {
        this.Se(t.length), this.buffer.set(t, this.position), this.position += t.length;
    }, 
    /** Makes a copy of the encoded bytes in this buffer.  */ t.prototype.Oe = function() {
        return this.buffer.slice(0, this.position);
    }, 
    /**
     * Encodes `val` into an encoding so that the order matches the IEEE 754
     * floating-point comparison results with the following exceptions:
     *   -0.0 < 0.0
     *   all non-NaN < NaN
     *   NaN = NaN
     */
    t.prototype.Ve = function(t) {
        var e = 
        /** Converts a JavaScript number to a byte array (using big endian encoding). */
        function(t) {
            var e = new DataView(new ArrayBuffer(8));
            return e.setFloat64(0, t, /* littleEndian= */ !1), new Uint8Array(e.buffer);
        }(t), n = 0 != (128 & e[0]);
        // Check if the first bit is set. We use a bit mask since value[0] is
        // encoded as a number from 0 to 255.
        // Revert the two complement to get natural ordering
                e[0] ^= n ? 255 : 128;
        for (var r = 1; r < e.length; ++r) e[r] ^= n ? 255 : 0;
        return e;
    }, 
    /** Writes a single byte ascending to the buffer. */ t.prototype.Ie = function(t) {
        var e = 255 & t;
        0 === e ? (this.xe(0), this.xe(255)) : 255 === e ? (this.xe(255), this.xe(0)) : this.xe(e);
    }, 
    /** Writes a single byte descending to the buffer.  */ t.prototype.Ae = function(t) {
        var e = 255 & t;
        0 === e ? (this.ke(0), this.ke(255)) : 255 === e ? (this.ke(255), this.ke(0)) : this.ke(t);
    }, t.prototype.Te = function() {
        this.xe(0), this.xe(1);
    }, t.prototype.Re = function() {
        this.ke(0), this.ke(1);
    }, t.prototype.xe = function(t) {
        this.Se(1), this.buffer[this.position++] = t;
    }, t.prototype.ke = function(t) {
        this.Se(1), this.buffer[this.position++] = ~t;
    }, t.prototype.Se = function(t) {
        var e = t + this.position;
        if (!(e <= this.buffer.length)) {
            // Try doubling.
            var n = 2 * this.buffer.length;
            // Still not big enough? Just allocate the right size.
                        n < e && (n = e);
            // Create the new buffer.
            var r = new Uint8Array(n);
            r.set(this.buffer), // copy old data
            this.buffer = r;
        }
    }, t;
}(), oo = /** @class */ function() {
    function t(t) {
        this.Me = t;
    }
    return t.prototype.de = function(t) {
        this.Me.pe(t);
    }, t.prototype.he = function(t) {
        this.Me.be(t);
    }, t.prototype.ae = function(t) {
        this.Me.ve(t);
    }, t.prototype.ue = function() {
        this.Me.Ce();
    }, t;
}(), uo = /** @class */ function() {
    function t(t) {
        this.Me = t;
    }
    return t.prototype.de = function(t) {
        this.Me.Ee(t);
    }, t.prototype.he = function(t) {
        this.Me.Pe(t);
    }, t.prototype.ae = function(t) {
        this.Me.De(t);
    }, t.prototype.ue = function() {
        this.Me.Ne();
    }, t;
}(), so = /** @class */ function() {
    function t() {
        this.Me = new io, this.Fe = new oo(this.Me), this.$e = new uo(this.Me);
    }
    return t.prototype.seed = function(t) {
        this.Me.seed(t);
    }, t.prototype.Be = function(t) {
        return 0 /* ASCENDING */ === t ? this.Fe : this.$e;
    }, t.prototype.Oe = function() {
        return this.Me.Oe();
    }, t.prototype.reset = function() {
        this.Me.reset();
    }, t;
}(), ao = /** @class */ function() {
    function t(t, e, n, r) {
        this.indexId = t, this.documentKey = e, this.arrayValue = n, this.directionalValue = r
        /**
     * Returns an IndexEntry entry that sorts immediately after the current
     * directional value.
     */;
    }
    return t.prototype.Le = function() {
        var e = this.directionalValue.length, n = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e, r = new Uint8Array(n);
        return r.set(this.directionalValue, 0), n !== e ? r.set([ 0 ], this.directionalValue.length) : ++r[r.length - 1], 
        new t(this.indexId, this.documentKey, this.arrayValue, r);
    }, t;
}();

function co(t, e) {
    var n = t.indexId - e.indexId;
    return 0 !== n ? n : 0 !== (n = lo(t.arrayValue, e.arrayValue)) ? n : 0 !== (n = lo(t.directionalValue, e.directionalValue)) ? n : mt.comparator(t.documentKey, e.documentKey);
}

function lo(t, e) {
    for (var n = 0; n < t.length && n < e.length; ++n) {
        var r = t[n] - e[n];
        if (0 !== r) return r;
    }
    return t.length - e.length;
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A light query planner for Firestore.
 *
 * This class matches a `FieldIndex` against a Firestore Query `Target`. It
 * determines whether a given index can be used to serve the specified target.
 *
 * The following table showcases some possible index configurations:
 *
 * Query                                               | Index
 * -----------------------------------------------------------------------------
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC, b DESC
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC
 * where('a', '==', 'a').where('b', '==', 'b')         | b DESC
 * where('a', '>=', 'a').orderBy('a')                  | a ASC
 * where('a', '>=', 'a').orderBy('a', 'desc')          | a DESC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC, b ASC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS, b ASCENDING
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS
 */ var ho = /** @class */ function() {
    function t(t) {
        this.collectionId = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment(), 
        this.Ue = t.orderBy, this.qe = [];
        for (var e = 0, n = t.filters; e < n.length; e++) {
            var r = n[e];
            r.ht() ? this.Ke = r : this.qe.push(r);
        }
    }
    /**
     * Returns whether the index can be used to serve the TargetIndexMatcher's
     * target.
     *
     * An index is considered capable of serving the target when:
     * - The target uses all index segments for its filters and orderBy clauses.
     *   The target can have additional filter and orderBy clauses, but not
     *   fewer.
     * - If an ArrayContains/ArrayContainsAnyfilter is used, the index must also
     *   have a corresponding `CONTAINS` segment.
     * - All directional index segments can be mapped to the target as a series of
     *   equality filters, a single inequality filter and a series of orderBy
     *   clauses.
     * - The segments that represent the equality filters may appear out of order.
     * - The optional segment for the inequality filter must appear after all
     *   equality segments.
     * - The segments that represent that orderBy clause of the target must appear
     *   in order after all equality and inequality segments. Single orderBy
     *   clauses cannot be skipped, but a continuous orderBy suffix may be
     *   omitted.
     */    return t.prototype.Ge = function(t) {
        // If there is an array element, find a matching filter.
        var e = wt(t);
        if (void 0 !== e && !this.Qe(e)) return !1;
        // Process all equalities first. Equalities can appear out of order.
        for (var n = bt(t), r = 0, i = 0; r < n.length && this.Qe(n[r]); ++r) ;
        // If we already have processed all segments, all segments are used to serve
        // the equality filters and we do not need to map any segments to the
        // target's inequality and orderBy clauses.
                if (r === n.length) return !0;
        // If there is an inequality filter, the next segment must match both the
        // filter and the first orderBy clause.
                if (void 0 !== this.Ke) {
            var o = n[r];
            if (!this.je(this.Ke, o) || !this.We(this.Ue[i++], o)) return !1;
            ++r;
        }
        // All remaining segments need to represent the prefix of the target's
        // orderBy.
                for (;r < n.length; ++r) {
            var u = n[r];
            if (i >= this.Ue.length || !this.We(this.Ue[i++], u)) return !1;
        }
        return !0;
    }, t.prototype.Qe = function(t) {
        for (var e = 0, n = this.qe; e < n.length; e++) {
            var r = n[e];
            if (this.je(r, t)) return !0;
        }
        return !1;
    }, t.prototype.je = function(t, e) {
        if (void 0 === t || !t.field.isEqual(e.fieldPath)) return !1;
        var n = "array-contains" /* ARRAY_CONTAINS */ === t.op || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === t.op;
        return 2 /* CONTAINS */ === e.kind === n;
    }, t.prototype.We = function(t, e) {
        return !!t.field.isEqual(e.fieldPath) && (0 /* ASCENDING */ === e.kind && "asc" /* ASCENDING */ === t.dir || 1 /* DESCENDING */ === e.kind && "desc" /* DESCENDING */ === t.dir);
    }, t;
}(), fo = /** @class */ function() {
    function t() {
        this.ze = new po;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        return this.ze.add(e), kt.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        return kt.resolve(this.ze.getEntries(e));
    }, t.prototype.addFieldIndex = function(t, e) {
        // Field indices are not supported with memory persistence.
        return kt.resolve();
    }, t.prototype.deleteFieldIndex = function(t, e) {
        // Field indices are not supported with memory persistence.
        return kt.resolve();
    }, t.prototype.getDocumentsMatchingTarget = function(t, e) {
        // Field indices are not supported with memory persistence.
        return kt.resolve(null);
    }, t.prototype.getIndexType = function(t, e) {
        // Field indices are not supported with memory persistence.
        return kt.resolve(0 /* NONE */);
    }, t.prototype.getFieldIndexes = function(t, e) {
        // Field indices are not supported with memory persistence.
        return kt.resolve([]);
    }, t.prototype.getNextCollectionGroupToUpdate = function(t) {
        // Field indices are not supported with memory persistence.
        return kt.resolve(null);
    }, t.prototype.getMinOffset = function(t, e) {
        return kt.resolve(Dt.min());
    }, t.prototype.getMinOffsetFromCollectionGroup = function(t, e) {
        return kt.resolve(Dt.min());
    }, t.prototype.updateCollectionGroup = function(t, e, n) {
        // Field indices are not supported with memory persistence.
        return kt.resolve();
    }, t.prototype.updateIndexEntries = function(t, e) {
        // Field indices are not supported with memory persistence.
        return kt.resolve();
    }, t;
}(), po = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new Yt(pt.comparator), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new Yt(pt.comparator)).toArray();
    }, t;
}(), vo = new Uint8Array(0), yo = /** @class */ function() {
    function t(t, e) {
        this.user = t, this.databaseId = e, 
        /**
             * An in-memory copy of the index entries we've already written since the SDK
             * launched. Used to avoid re-writing the same entry repeatedly.
             *
             * This is *NOT* a complete cache of what's in persistence and so can never be
             * used to satisfy reads.
             */
        this.He = new po, 
        /**
             * Maps from a target to its equivalent list of sub-targets. Each sub-target
             * contains only one term from the target's disjunctive normal form (DNF).
             */
        this.Je = new or((function(t) {
            return qe(t);
        }), (function(t, e) {
            return Ue(t, e);
        })), this.uid = t.uid || ""
        /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        var n = this;
        if (!this.He.has(e)) {
            var r = e.lastSegment(), i = e.popLast();
            t.addOnCommittedListener((function() {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                n.He.add(e);
            }));
            var o = {
                collectionId: r,
                parent: oi(i)
            };
            return mo(t).put(o);
        }
        return kt.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        var n = [], r = IDBKeyRange.bound([ e, "" ], [ lt(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return mo(t).K(r).next((function(t) {
            for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                                if (o.collectionId !== e) break;
                n.push(ai(o.parent));
            }
            return n;
        }));
    }, t.prototype.addFieldIndex = function(t, e) {
        var n = this, r = wo(t), i = function(t) {
            return {
                indexId: t.indexId,
                collectionGroup: t.collectionGroup,
                fields: t.fields.map((function(t) {
                    return [ t.fieldPath.canonicalString(), t.kind ];
                }))
            };
        }(e);
        // TODO(indexing): Verify that the auto-incrementing index ID works in
        // Safari & Firefox.
                delete i.indexId;
        // `indexId` is auto-populated by IndexedDb
        var o = r.add(i);
        if (e.indexState) {
            var u = bo(t);
            return o.next((function(t) {
                u.put(Yi(t, n.user, e.indexState.sequenceNumber, e.indexState.offset));
            }));
        }
        return o.next();
    }, t.prototype.deleteFieldIndex = function(t, e) {
        var n = wo(t), r = bo(t), i = go(t);
        return n.delete(e.indexId).next((function() {
            return r.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0));
        })).next((function() {
            return i.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0));
        }));
    }, t.prototype.getDocumentsMatchingTarget = function(t, e) {
        var n = this, r = go(t), i = !0, o = new Map;
        return kt.forEach(this.Ye(e), (function(e) {
            return n.Xe(t, e).next((function(t) {
                i && (i = !!t), o.set(e, t);
            }));
        })).next((function() {
            if (i) {
                var t = yr(), u = [];
                return kt.forEach(o, (function(i, o) {
                    /** Returns a debug representation of the field index */
                    var s;
                    U("IndexedDbIndexManager", "Using index " + ("id=" + (s = i).indexId + "|cg=" + s.collectionGroup + "|f=" + s.fields.map((function(t) {
                        return t.fieldPath + ":" + t.kind;
                    })).join(",") + " to execute ") + qe(e));
                    var a = function(t, e) {
                        var n = wt(e);
                        if (void 0 === n) return null;
                        for (var r = 0, i = Ke(t, n.fieldPath); r < i.length; r++) {
                            var o = i[r];
                            switch (o.op) {
                              case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                                return o.value.arrayValue.values || [];

                              case "array-contains" /* ARRAY_CONTAINS */ :
                                return [ o.value ];
                                // Remaining filters are not array filters.
                                                        }
                        }
                        return null;
                    }(o, i), c = function(t, e) {
                        for (var n = new Map, r = 0, i = bt(e); r < i.length; r++) for (var o = i[r], u = 0, s = Ke(t, o.fieldPath); u < s.length; u++) {
                            var a = s[u];
                            switch (a.op) {
                              case "==" /* EQUAL */ :
                              case "in" /* IN */ :
                                // Encode equality prefix, which is encoded in the index value before
                                // the inequality (e.g. `a == 'a' && b != 'b'` is encoded to
                                // `value != 'ab'`).
                                n.set(o.fieldPath.canonicalString(), a.value);
                                break;

                              case "not-in" /* NOT_IN */ :
                              case "!=" /* NOT_EQUAL */ :
                                // NotIn/NotEqual is always a suffix. There cannot be any remaining
                                // segments and hence we can return early here.
                                return n.set(o.fieldPath.canonicalString(), a.value), Array.from(n.values());
                                // Remaining filters cannot be used as notIn bounds.
                                                        }
                        }
                        return null;
                    }(o, i), l = function(t, e) {
                        // For each segment, retrieve a lower bound if there is a suitable filter or
                        // startAt.
                        for (var n = [], r = !0, i = 0, o = bt(e); i < o.length; i++) {
                            var u = o[i], s = 0 /* ASCENDING */ === u.kind ? Ge(t, u.fieldPath, t.startAt) : je(t, u.fieldPath, t.startAt);
                            n.push(s.value), r && (r = s.inclusive);
                        }
                        return new tn(n, r);
                    }(o, i), h = function(t, e) {
                        // For each segment, retrieve an upper bound if there is a suitable filter or
                        // endAt.
                        for (var n = [], r = !0, i = 0, o = bt(e); i < o.length; i++) {
                            var u = o[i], s = 0 /* ASCENDING */ === u.kind ? je(t, u.fieldPath, t.endAt) : Ge(t, u.fieldPath, t.endAt);
                            n.push(s.value), r && (r = s.inclusive);
                        }
                        return new tn(n, r);
                    }(o, i), f = n.Ze(i, o, l), d = n.Ze(i, o, h), p = n.tn(i, o, c), v = n.en(i.indexId, a, f, l.inclusive, d, h.inclusive, p);
                    return kt.forEach(v, (function(n) {
                        return r.j(n, e.limit).next((function(e) {
                            e.forEach((function(e) {
                                var n = mt.fromSegments(e.documentKey);
                                t.has(n) || (t = t.add(n), u.push(n));
                            }));
                        }));
                    }));
                })).next((function() {
                    return u;
                }));
            }
            return kt.resolve(null);
        }));
    }, t.prototype.Ye = function(t) {
        var e = this.Je.get(t);
        return e || (
        // TODO(orquery): Implement DNF transform
        e = [ t ], this.Je.set(t, e), e);
    }, 
    /**
     * Constructs a key range query on `DbIndexEntryStore` that unions all
     * bounds.
     */
    t.prototype.en = function(t, e, n, r, i, o, u) {
        for (var s = this, a = (null != e ? e.length : 1) * Math.max(n.length, i.length), c = a / (null != e ? e.length : 1), l = [], h = function(a) {
            var h = e ? f.nn(e[a / c]) : vo, d = f.sn(t, h, n[a % c], r), p = f.rn(t, h, i[a % c], o), v = u.map((function(e) {
                return s.sn(t, h, e, 
                /* inclusive= */ !0);
            }));
            l.push.apply(l, f.createRange(d, p, v));
        }, f = this, d = 0
        // The number of total index scans we union together. This is similar to a
        // distributed normal form, but adapted for array values. We create a single
        // index range per value in an ARRAY_CONTAINS or ARRAY_CONTAINS_ANY filter
        // combined with the values from the query bounds.
        ; d < a; ++d) h(d);
        return l;
    }, 
    /** Generates the lower bound for `arrayValue` and `directionalValue`. */ t.prototype.sn = function(t, e, n, r) {
        var i = new ao(t, mt.empty(), e, n);
        return r ? i : i.Le();
    }, 
    /** Generates the upper bound for `arrayValue` and `directionalValue`. */ t.prototype.rn = function(t, e, n, r) {
        var i = new ao(t, mt.empty(), e, n);
        return r ? i.Le() : i;
    }, t.prototype.Xe = function(t, e) {
        var n = new ho(e), r = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment();
        return this.getFieldIndexes(t, r).next((function(t) {
            for (
            // Return the index with the most number of segments.
            var e = null, r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                n.Ge(o) && (!e || o.fields.length > e.fields.length) && (e = o);
            }
            return e;
        }));
    }, t.prototype.getIndexType = function(t, e) {
        var n = this, r = 2 /* FULL */;
        return kt.forEach(this.Ye(e), (function(e) {
            return n.Xe(t, e).next((function(t) {
                t ? 0 /* NONE */ !== r && t.fields.length < function(t) {
                    for (var e = new Yt(yt.comparator), n = !1, r = 0, i = t.filters; r < i.length; r++) {
                        var o = i[r];
                        // TODO(orquery): Use the flattened filters here
                                                // __name__ is not an explicit segment of any index, so we don't need to
                        // count it.
                        o.field.isKeyField() || (
                        // ARRAY_CONTAINS or ARRAY_CONTAINS_ANY filters must be counted separately.
                        // For instance, it is possible to have an index for "a ARRAY a ASC". Even
                        // though these are on the same field, they should be counted as two
                        // separate segments in an index.
                        "array-contains" /* ARRAY_CONTAINS */ === o.op || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o.op ? n = !0 : e = e.add(o.field));
                    }
                    for (var u = 0, s = t.orderBy; u < s.length; u++) {
                        var a = s[u];
                        // __name__ is not an explicit segment of any index, so we don't need to
                        // count it.
                                                a.field.isKeyField() || (e = e.add(a.field));
                    }
                    return e.size + (n ? 1 : 0);
                }(e) && (r = 1 /* PARTIAL */) : r = 0 /* NONE */;
            }));
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Returns the byte encoded form of the directional values in the field index.
     * Returns `null` if the document does not have all fields specified in the
     * index.
     */
    t.prototype.on = function(t, e) {
        for (var n = new so, r = 0, i = bt(t); r < i.length; r++) {
            var o = i[r], u = e.data.field(o.fieldPath);
            if (null == u) return null;
            var s = n.Be(o.kind);
            eo.ye.re(u, s);
        }
        return n.Oe();
    }, 
    /** Encodes a single value to the ascending index format. */ t.prototype.nn = function(t) {
        var e = new so;
        return eo.ye.re(t, e.Be(0 /* ASCENDING */)), e.Oe();
    }, 
    /**
     * Returns an encoded form of the document key that sorts based on the key
     * ordering of the field index.
     */
    t.prototype.un = function(t, e) {
        var n = new so;
        return eo.ye.re(Ee(this.databaseId, e), n.Be(function(t) {
            var e = bt(t);
            return 0 === e.length ? 0 /* ASCENDING */ : e[e.length - 1].kind;
        }(t))), n.Oe();
    }, 
    /**
     * Encodes the given field values according to the specification in `target`.
     * For IN queries, a list of possible values is returned.
     */
    t.prototype.tn = function(t, e, n) {
        if (null === n) return [];
        var r = [];
        r.push(new so);
        for (var i = 0, o = 0, u = bt(t); o < u.length; o++) for (var s = u[o], a = n[i++], c = 0, l = r; c < l.length; c++) {
            var h = l[c];
            if (this.cn(e, s.fieldPath) && Se(a)) r = this.an(r, s, a); else {
                var f = h.Be(s.kind);
                eo.ye.re(a, f);
            }
        }
        return this.hn(r);
    }, 
    /**
     * Encodes the given bounds according to the specification in `target`. For IN
     * queries, a list of possible values is returned.
     */
    t.prototype.Ze = function(t, e, n) {
        return this.tn(t, e, n.position);
    }, 
    /** Returns the byte representation for the provided encoders. */ t.prototype.hn = function(t) {
        for (var e = [], n = 0; n < t.length; ++n) e[n] = t[n].Oe();
        return e;
    }, 
    /**
     * Creates a separate encoder for each element of an array.
     *
     * The method appends each value to all existing encoders (e.g. filter("a",
     * "==", "a1").filter("b", "in", ["b1", "b2"]) becomes ["a1,b1", "a1,b2"]). A
     * list of new encoders is returned.
     */
    t.prototype.an = function(t, e, n) {
        for (var i = r([], t), o = [], u = 0, s = n.arrayValue.values || []; u < s.length; u++) for (var a = s[u], c = 0, l = i; c < l.length; c++) {
            var h = l[c], f = new so;
            f.seed(h.Oe()), eo.ye.re(a, f.Be(e.kind)), o.push(f);
        }
        return o;
    }, t.prototype.cn = function(t, e) {
        return !!t.filters.find((function(t) {
            return t instanceof ze && t.field.isEqual(e) && ("in" /* IN */ === t.op || "not-in" /* NOT_IN */ === t.op);
        }));
    }, t.prototype.getFieldIndexes = function(t, e) {
        var n = this, r = wo(t), i = bo(t);
        return (e ? r.K("collectionGroupIndex", IDBKeyRange.bound(e, e)) : r.K()).next((function(t) {
            var e = [];
            return kt.forEach(t, (function(t) {
                return i.get([ t.indexId, n.uid ]).next((function(n) {
                    e.push(function(t, e) {
                        var n = e ? new Et(e.sequenceNumber, new Dt(Ki(e.readTime), new mt(ai(e.documentKey)), e.largestBatchId)) : Et.empty(), r = t.fields.map((function(t) {
                            var e = t[0], n = t[1];
                            return new It(yt.fromServerFormat(e), n);
                        }));
                        return new gt(t.indexId, t.collectionGroup, r, n);
                    }(t, n));
                }));
            })).next((function() {
                return e;
            }));
        }));
    }, t.prototype.getNextCollectionGroupToUpdate = function(t) {
        return this.getFieldIndexes(t).next((function(t) {
            return 0 === t.length ? null : (t.sort((function(t, e) {
                var n = t.indexState.sequenceNumber - e.indexState.sequenceNumber;
                return 0 !== n ? n : at(t.collectionGroup, e.collectionGroup);
            })), t[0].collectionGroup);
        }));
    }, t.prototype.updateCollectionGroup = function(t, e, n) {
        var r = this, i = wo(t), o = bo(t);
        return this.ln(t).next((function(t) {
            return i.K("collectionGroupIndex", IDBKeyRange.bound(e, e)).next((function(e) {
                return kt.forEach(e, (function(e) {
                    return o.put(Yi(e.indexId, r.user, t, n));
                }));
            }));
        }));
    }, t.prototype.updateIndexEntries = function(t, e) {
        var n = this, r = new Map;
        // Porting Note: `getFieldIndexes()` on Web does not cache index lookups as
        // it could be used across different IndexedDB transactions. As any cached
        // data might be invalidated by other multi-tab clients, we can only trust
        // data within a single IndexedDB transaction. We therefore add a cache
        // here.
                return kt.forEach(e, (function(e, i) {
            var o = r.get(e.collectionGroup);
            return (o ? kt.resolve(o) : n.getFieldIndexes(t, e.collectionGroup)).next((function(o) {
                return r.set(e.collectionGroup, o), kt.forEach(o, (function(r) {
                    return n.fn(t, e, r).next((function(e) {
                        var o = n.dn(i, r);
                        return e.isEqual(o) ? kt.resolve() : n._n(t, i, r, e, o);
                    }));
                }));
            }));
        }));
    }, t.prototype.wn = function(t, e, n, r) {
        return go(t).put({
            indexId: r.indexId,
            uid: this.uid,
            arrayValue: r.arrayValue,
            directionalValue: r.directionalValue,
            orderedDocumentKey: this.un(n, e.key),
            documentKey: e.key.path.toArray()
        });
    }, t.prototype.mn = function(t, e, n, r) {
        return go(t).delete([ r.indexId, this.uid, r.arrayValue, r.directionalValue, this.un(n, e.key), e.key.path.toArray() ]);
    }, t.prototype.fn = function(t, e, n) {
        var r = go(t), i = new Yt(co);
        return r.J({
            index: "documentKeyIndex",
            range: IDBKeyRange.only([ n.indexId, this.uid, this.un(n, e) ])
        }, (function(t, r) {
            i = i.add(new ao(n.indexId, e, r.arrayValue, r.directionalValue));
        })).next((function() {
            return i;
        }));
    }, 
    /** Creates the index entries for the given document. */ t.prototype.dn = function(t, e) {
        var n = new Yt(co), r = this.on(e, t);
        if (null == r) return n;
        var i = wt(e);
        if (null != i) {
            var o = t.data.field(i.fieldPath);
            if (Se(o)) for (var u = 0, s = o.arrayValue.values || []; u < s.length; u++) {
                var a = s[u];
                n = n.add(new ao(e.indexId, t.key, this.nn(a), r));
            }
        } else n = n.add(new ao(e.indexId, t.key, vo, r));
        return n;
    }, 
    /**
     * Updates the index entries for the provided document by deleting entries
     * that are no longer referenced in `newEntries` and adding all newly added
     * entries.
     */
    t.prototype._n = function(t, e, n, r, i) {
        var o = this;
        U("IndexedDbIndexManager", "Updating index entries for document '%s'", e.key);
        var u = [];
        return function(t, e, n, r, i) {
            // Walk through the two sets at the same time, using the ordering defined by
            // `comparator`.
            for (var o = t.getIterator(), u = e.getIterator(), s = Xt(o), a = Xt(u); s || a; ) {
                var c = !1, l = !1;
                if (s && a) {
                    var h = n(s, a);
                    h < 0 ? 
                    // The element was removed if the next element in our ordered
                    // walkthrough is only in `before`.
                    l = !0 : h > 0 && (
                    // The element was added if the next element in our ordered walkthrough
                    // is only in `after`.
                    c = !0);
                } else null != s ? l = !0 : c = !0;
                c ? (r(a), a = Xt(u)) : l ? (i(s), s = Xt(o)) : (s = Xt(o), a = Xt(u));
            }
        }(r, i, co, (
        /* onAdd= */ function(r) {
            u.push(o.wn(t, e, n, r));
        }), (
        /* onRemove= */ function(r) {
            u.push(o.mn(t, e, n, r));
        })), kt.waitFor(u);
    }, t.prototype.ln = function(t) {
        var e = 1;
        return bo(t).J({
            index: "sequenceNumberIndex",
            reverse: !0,
            range: IDBKeyRange.upperBound([ this.uid, Number.MAX_SAFE_INTEGER ])
        }, (function(t, n, r) {
            r.done(), e = n.sequenceNumber + 1;
        })).next((function() {
            return e;
        }));
    }, 
    /**
     * Returns a new set of IDB ranges that splits the existing range and excludes
     * any values that match the `notInValue` from these ranges. As an example,
     * '[foo > 2 && foo != 3]` becomes  `[foo > 2 && < 3, foo > 3]`.
     */
    t.prototype.createRange = function(t, e, n) {
        // The notIn values need to be sorted and unique so that we can return a
        // sorted set of non-overlapping ranges.
        n = n.sort((function(t, e) {
            return co(t, e);
        })).filter((function(t, e, n) {
            return !e || 0 !== co(t, n[e - 1]);
        }));
        var r = [];
        r.push(t);
        for (var i = 0, o = n; i < o.length; i++) {
            var u = o[i], s = co(u, t), a = co(u, e);
            if (0 === s) 
            // `notInValue` is the lower bound. We therefore need to raise the bound
            // to the next value.
            r[0] = t.Le(); else if (s > 0 && a < 0) 
            // `notInValue` is in the middle of the range
            r.push(u), r.push(u.Le()); else if (a > 0) 
            // `notInValue` (and all following values) are out of the range
            break;
        }
        r.push(e);
        for (var c = [], l = 0; l < r.length; l += 2) c.push(IDBKeyRange.bound([ r[l].indexId, this.uid, r[l].arrayValue, r[l].directionalValue, vo, [] ], [ r[l + 1].indexId, this.uid, r[l + 1].arrayValue, r[l + 1].directionalValue, vo, [] ]));
        return c;
    }, t.prototype.getMinOffsetFromCollectionGroup = function(t, e) {
        return this.getFieldIndexes(t, e).next(Io);
    }, t.prototype.getMinOffset = function(t, e) {
        var n = this;
        return kt.mapArray(this.Ye(e), (function(e) {
            return n.Xe(t, e).next((function(t) {
                return t || j();
            }));
        })).next(Io);
    }, t;
}();

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory implementation of IndexManager.
 */
/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */
function mo(t) {
    return Oi(t, "collectionParents");
}

/**
 * Helper to get a typed SimpleDbStore for the index entry object store.
 */ function go(t) {
    return Oi(t, "indexEntries");
}

/**
 * Helper to get a typed SimpleDbStore for the index configuration object store.
 */ function wo(t) {
    return Oi(t, "indexConfiguration");
}

/**
 * Helper to get a typed SimpleDbStore for the index state object store.
 */ function bo(t) {
    return Oi(t, "indexState");
}

function Io(t) {
    z(0 !== t.length);
    for (var e = t[0].indexState.offset, n = e.largestBatchId, r = 1; r < t.length; r++) {
        var i = t[r].indexState.offset;
        _t(i, e) < 0 && (e = i), n < i.largestBatchId && (n = i.largestBatchId);
    }
    return new Dt(e.readTime, e.documentKey, n);
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Eo = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
}, To = /** @class */ function() {
    function t(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
    }
    return t.withCacheSize = function(e) {
        return new t(e, t.DEFAULT_COLLECTION_PERCENTILE, t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
function So(t, e, n) {
    var r = t.store("mutations"), i = t.store("documentMutations"), o = [], u = IDBKeyRange.only(n.batchId), s = 0, a = r.J({
        range: u
    }, (function(t, e, n) {
        return s++, n.delete();
    }));
    o.push(a.next((function() {
        z(1 === s);
    })));
    for (var c = [], l = 0, h = n.mutations; l < h.length; l++) {
        var f = h[l], d = hi(e, f.key.path, n.batchId);
        o.push(i.delete(d)), c.push(f.key);
    }
    return kt.waitFor(o).next((function() {
        return c;
    }));
}

/**
 * Returns an approximate size for the given document.
 */ function Do(t) {
    if (!t) return 0;
    var e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw j();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A mutation queue for a specific user, backed by IndexedDB. */ To.DEFAULT_COLLECTION_PERCENTILE = 10, 
To.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, To.DEFAULT = new To(41943040, To.DEFAULT_COLLECTION_PERCENTILE, To.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), 
To.DISABLED = new To(-1, 0, 0);

var _o = /** @class */ function() {
    function t(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, r) {
        this.userId = t, this.wt = e, this.indexManager = n, this.referenceDelegate = r, 
        /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
        // PORTING NOTE: Multi-tab only.
        this.gn = {}
        /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */;
    }
    return t.se = function(e, n, r, i) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        return z("" !== e.uid), new t(e.isAuthenticated() ? e.uid : "", n, r, i);
    }, t.prototype.checkEmpty = function(t) {
        var e = !0, n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return No(t).J({
            index: "userMutationsIndex",
            range: n
        }, (function(t, n, r) {
            e = !1, r.done();
        })).next((function() {
            return e;
        }));
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this, o = Ao(t), u = No(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return u.add({}).next((function(s) {
            z("number" == typeof s);
            for (var a = new Mi(s, e, n, r), c = function(t, e, n) {
                var r = n.baseMutations.map((function(e) {
                    return zr(t.ne, e);
                })), i = n.mutations.map((function(e) {
                    return zr(t.ne, e);
                }));
                return {
                    userId: e,
                    batchId: n.batchId,
                    localWriteTimeMs: n.localWriteTime.toMillis(),
                    baseMutations: r,
                    mutations: i
                };
            }(i.wt, i.userId, a), l = [], h = new Yt((function(t, e) {
                return at(t.canonicalString(), e.canonicalString());
            })), f = 0, d = r; f < d.length; f++) {
                var p = d[f], v = hi(i.userId, p.key.path, s);
                h = h.add(p.key.path.popLast()), l.push(u.put(c)), l.push(o.put(v, fi));
            }
            return h.forEach((function(e) {
                l.push(i.indexManager.addToCollectionParentIndex(t, e));
            })), t.addOnCommittedListener((function() {
                i.gn[s] = a.keys();
            })), kt.waitFor(l).next((function() {
                return a;
            }));
        }));
    }, t.prototype.lookupMutationBatch = function(t, e) {
        var n = this;
        return No(t).get(e).next((function(t) {
            return t ? (z(t.userId === n.userId), Gi(n.wt, t)) : null;
        }));
    }, 
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.yn = function(t, e) {
        var n = this;
        return this.gn[e] ? kt.resolve(this.gn[e]) : this.lookupMutationBatch(t, e).next((function(t) {
            if (t) {
                var r = t.keys();
                return n.gn[e] = r, r;
            }
            return null;
        }));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = this, r = e + 1, i = IDBKeyRange.lowerBound([ this.userId, r ]), o = null;
        return No(t).J({
            index: "userMutationsIndex",
            range: i
        }, (function(t, e, i) {
            e.userId === n.userId && (z(e.batchId >= r), o = Gi(n.wt, e)), i.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getHighestUnacknowledgedBatchId = function(t) {
        var e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]), n = -1;
        return No(t).J({
            index: "userMutationsIndex",
            range: e,
            reverse: !0
        }, (function(t, e, r) {
            n = e.batchId, r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.getAllMutationBatches = function(t) {
        var e = this, n = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return No(t).K("userMutationsIndex", n).next((function(t) {
            return t.map((function(t) {
                return Gi(e.wt, t);
            }));
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = li(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
                return Ao(t).J({
            range: i
        }, (function(r, i, u) {
            var s = r[0], a = r[1], c = r[2], l = ai(a);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (s === n.userId && e.path.isEqual(l)) 
            // Look up the mutation batch in the store.
            return No(t).get(c).next((function(t) {
                if (!t) throw j();
                z(t.userId === n.userId), o.push(Gi(n.wt, t));
            }));
            u.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new Yt(at), i = [];
        return e.forEach((function(e) {
            var o = li(n.userId, e.path), u = IDBKeyRange.lowerBound(o), s = Ao(t).J({
                range: u
            }, (function(t, i, o) {
                var u = t[0], s = t[1], a = t[2], c = ai(s);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                u === n.userId && e.path.isEqual(c) ? r = r.add(a) : o.done();
            }));
            i.push(s);
        })), kt.waitFor(i).next((function() {
            return n.pn(t, r);
        }));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        var n = this, r = e.path, i = r.length + 1, o = li(this.userId, r), u = IDBKeyRange.lowerBound(o), s = new Yt(at);
        return Ao(t).J({
            range: u
        }, (function(t, e, o) {
            var u = t[0], a = t[1], c = t[2], l = ai(a);
            u === n.userId && r.isPrefixOf(l) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            l.length === i && (s = s.add(c)) : o.done();
        })).next((function() {
            return n.pn(t, s);
        }));
    }, t.prototype.pn = function(t, e) {
        var n = this, r = [], i = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((function(e) {
            i.push(No(t).get(e).next((function(t) {
                if (null === t) throw j();
                z(t.userId === n.userId), r.push(Gi(n.wt, t));
            })));
        })), kt.waitFor(i).next((function() {
            return r;
        }));
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        return So(t.ee, this.userId, e).next((function(r) {
            return t.addOnCommittedListener((function() {
                n.In(e.batchId);
            })), kt.forEach(r, (function(e) {
                return n.referenceDelegate.markPotentiallyOrphaned(t, e);
            }));
        }));
    }, 
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    t.prototype.In = function(t) {
        delete this.gn[t];
    }, t.prototype.performConsistencyCheck = function(t) {
        var e = this;
        return this.checkEmpty(t).next((function(n) {
            if (!n) return kt.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        var r = IDBKeyRange.lowerBound([ e.userId ]), i = [];
            return Ao(t).J({
                range: r
            }, (function(t, n, r) {
                if (t[0] === e.userId) {
                    var o = ai(t[1]);
                    i.push(o);
                } else r.done();
            })).next((function() {
                z(0 === i.length);
            }));
        }));
    }, t.prototype.containsKey = function(t, e) {
        return xo(t, this.userId, e);
    }, 
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t.prototype.Tn = function(t) {
        var e = this;
        return ko(t).get(this.userId).next((function(t) {
            return t || {
                userId: e.userId,
                lastAcknowledgedBatchId: -1,
                lastStreamToken: ""
            };
        }));
    }, t;
}();

/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function xo(t, e, n) {
    var r = li(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), u = !1;
    return Ao(t).J({
        range: o,
        H: !0
    }, (function(t, n, r) {
        var o = t[0], s = t[1];
 /*batchID*/        t[2], o === e && s === i && (u = !0), 
        r.done();
    })).next((function() {
        return u;
    }));
}

/** Returns true if any mutation queue contains the given document. */
/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */ function No(t) {
    return Oi(t, "mutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function Ao(t) {
    return Oi(t, "documentMutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function ko(t) {
    return Oi(t, "mutationQueues");
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Offset to ensure non-overlapping target ids. */
/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */ var Co = /** @class */ function() {
    function t(t) {
        this.En = t;
    }
    return t.prototype.next = function() {
        return this.En += 2, this.En;
    }, t.An = function() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new t(0);
    }, t.Rn = function() {
        // Sync engine assigns target IDs for limbo document detection.
        return new t(-1);
    }, t;
}(), Vo = /** @class */ function() {
    function t(t, e) {
        this.referenceDelegate = t, this.wt = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
        return t.prototype.allocateTargetId = function(t) {
        var e = this;
        return this.bn(t).next((function(n) {
            var r = new Co(n.highestTargetId);
            return n.highestTargetId = r.next(), e.Pn(t, n).next((function() {
                return n.highestTargetId;
            }));
        }));
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return this.bn(t).next((function(t) {
            return ft.fromTimestamp(new ht(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds));
        }));
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return this.bn(t).next((function(t) {
            return t.highestListenSequenceNumber;
        }));
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        var r = this;
        return this.bn(t).next((function(i) {
            return i.highestListenSequenceNumber = e, n && (i.lastRemoteSnapshotVersion = n.toTimestamp()), 
            e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e), r.Pn(t, i);
        }));
    }, t.prototype.addTargetData = function(t, e) {
        var n = this;
        return this.vn(t, e).next((function() {
            return n.bn(t).next((function(r) {
                return r.targetCount += 1, n.Vn(e, r), n.Pn(t, r);
            }));
        }));
    }, t.prototype.updateTargetData = function(t, e) {
        return this.vn(t, e);
    }, t.prototype.removeTargetData = function(t, e) {
        var n = this;
        return this.removeMatchingKeysForTargetId(t, e.targetId).next((function() {
            return Oo(t).delete(e.targetId);
        })).next((function() {
            return n.bn(t);
        })).next((function(e) {
            return z(e.targetCount > 0), e.targetCount -= 1, n.Pn(t, e);
        }));
    }, 
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return Oo(t).J((function(u, s) {
            var a = ji(s);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.removeTargetData(t, a)));
        })).next((function() {
            return kt.waitFor(o);
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t.prototype.forEachTarget = function(t, e) {
        return Oo(t).J((function(t, n) {
            var r = ji(n);
            e(r);
        }));
    }, t.prototype.bn = function(t) {
        return Mo(t).get("targetGlobalKey").next((function(t) {
            return z(null !== t), t;
        }));
    }, t.prototype.Pn = function(t, e) {
        return Mo(t).put("targetGlobalKey", e);
    }, t.prototype.vn = function(t, e) {
        return Oo(t).put(zi(this.wt, e));
    }, 
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    t.prototype.Vn = function(t, e) {
        var n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }, t.prototype.getTargetCount = function(t) {
        return this.bn(t).next((function(t) {
            return t.targetCount;
        }));
    }, t.prototype.getTargetData = function(t, e) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        var n = qe(e), r = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]), i = null;
        return Oo(t).J({
            range: r,
            index: "queryTargetsIndex"
        }, (function(t, n, r) {
            var o = ji(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        Ue(e, o.target) && (i = o, r.done());
        })).next((function() {
            return i;
        }));
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        var r = this, i = [], o = Ro(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return e.forEach((function(e) {
            var u = oi(e.path);
            i.push(o.put({
                targetId: n,
                path: u
            })), i.push(r.referenceDelegate.addReference(t, n, e));
        })), kt.waitFor(i);
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        var r = this, i = Ro(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return kt.forEach(e, (function(e) {
            var o = oi(e.path);
            return kt.waitFor([ i.delete([ n, o ]), r.referenceDelegate.removeReference(t, n, e) ]);
        }));
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        var n = Ro(t), r = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(r);
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), r = Ro(t), i = yr();
        return r.J({
            range: n,
            H: !0
        }, (function(t, e, n) {
            var r = ai(t[1]), o = new mt(r);
            i = i.add(o);
        })).next((function() {
            return i;
        }));
    }, t.prototype.containsKey = function(t, e) {
        var n = oi(e.path), r = IDBKeyRange.bound([ n ], [ lt(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), i = 0;
        return Ro(t).J({
            index: "documentTargetsIndex",
            H: !0,
            range: r
        }, (function(t, e, n) {
            var r = t[0];
            t[1], 
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
            0 !== r && (i++, n.done());
        })).next((function() {
            return i > 0;
        }));
    }, 
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.te = function(t, e) {
        return Oo(t).get(e).next((function(t) {
            return t ? ji(t) : null;
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function Oo(t) {
    return Oi(t, "targets");
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function Mo(t) {
    return Oi(t, "targetGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function Ro(t) {
    return Oi(t, "targetDocuments");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Lo(t, e) {
    var n = t[0], r = t[1], i = e[0], o = e[1], u = at(n, i);
    return 0 === u ? at(r, o) : u;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ var Fo = /** @class */ function() {
    function t(t) {
        this.Sn = t, this.buffer = new Yt(Lo), this.Dn = 0;
    }
    return t.prototype.Cn = function() {
        return ++this.Dn;
    }, t.prototype.xn = function(t) {
        var e = [ t, this.Cn() ];
        if (this.buffer.size < this.Sn) this.buffer = this.buffer.add(e); else {
            var n = this.buffer.last();
            Lo(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
        }
    }, Object.defineProperty(t.prototype, "maxValue", {
        get: function() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), Po = /** @class */ function() {
    function t(t, e, n) {
        this.garbageCollector = t, this.asyncQueue = e, this.localStore = n, this.Nn = null;
    }
    return t.prototype.start = function() {
        -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.kn(6e4);
    }, t.prototype.stop = function() {
        this.Nn && (this.Nn.cancel(), this.Nn = null);
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return null !== this.Nn;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.kn = function(t) {
        var r = this;
        U("LruGarbageCollector", "Garbage collection scheduled in " + t + "ms"), this.Nn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* LruGarbageCollection */ , t, (function() {
            return e(r, void 0, void 0, (function() {
                var t;
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        this.Nn = null, e.label = 1;

                      case 1:
                        return e.trys.push([ 1, 3, , 7 ]), [ 4 /*yield*/ , this.localStore.collectGarbage(this.garbageCollector) ];

                      case 2:
                        return e.sent(), [ 3 /*break*/ , 7 ];

                      case 3:
                        return Rt(t = e.sent()) ? (U("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , At(t) ];

                      case 5:
                        e.sent(), e.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.kn(3e5) ];

                      case 8:
                        return e.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), qo = /** @class */ function() {
    function t(t, e) {
        this.On = t, this.params = e;
    }
    return t.prototype.calculateTargetCount = function(t, e) {
        return this.On.Mn(t).next((function(t) {
            return Math.floor(e / 100 * t);
        }));
    }, t.prototype.nthSequenceNumber = function(t, e) {
        var n = this;
        if (0 === e) return kt.resolve(Kt.ot);
        var r = new Fo(e);
        return this.On.forEachTarget(t, (function(t) {
            return r.xn(t.sequenceNumber);
        })).next((function() {
            return n.On.Fn(t, (function(t) {
                return r.xn(t);
            }));
        })).next((function() {
            return r.maxValue;
        }));
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.On.removeTargets(t, e, n);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        return this.On.removeOrphanedDocuments(t, e);
    }, t.prototype.collect = function(t, e) {
        var n = this;
        return -1 === this.params.cacheSizeCollectionThreshold ? (U("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        kt.resolve(Eo)) : this.getCacheSize(t).next((function(r) {
            return r < n.params.cacheSizeCollectionThreshold ? (U("LruGarbageCollector", "Garbage collection skipped; Cache size " + r + " is lower than threshold " + n.params.cacheSizeCollectionThreshold), 
            Eo) : n.$n(t, e);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.On.getCacheSize(t);
    }, t.prototype.$n = function(t, e) {
        var n, r, i, o, u, s, a, c = this, l = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect).next((function(e) {
            // Cap at the configured max
            return e > c.params.maximumSequenceNumbersToCollect ? (U("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + c.params.maximumSequenceNumbersToCollect + " from " + e), 
            r = c.params.maximumSequenceNumbersToCollect) : r = e, o = Date.now(), c.nthSequenceNumber(t, r);
        })).next((function(r) {
            return n = r, u = Date.now(), c.removeTargets(t, n, e);
        })).next((function(e) {
            return i = e, s = Date.now(), c.removeOrphanedDocuments(t, n);
        })).next((function(t) {
            return a = Date.now(), P() <= h.DEBUG && U("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (o - l) + "ms\n\tDetermined least recently used " + r + " in " + (u - o) + "ms\n\tRemoved " + i + " targets in " + (s - u) + "ms\n\tRemoved " + t + " documents in " + (a - s) + "ms\nTotal Duration: " + (a - l) + "ms"), 
            kt.resolve({
                didRun: !0,
                sequenceNumbersCollected: r,
                targetsRemoved: i,
                documentsRemoved: t
            });
        }));
    }, t;
}(), Uo = /** @class */ function() {
    function t(t, e) {
        this.db = t, this.garbageCollector = function(t, e) {
            return new qo(t, e);
        }(this, e);
    }
    return t.prototype.Mn = function(t) {
        var e = this.Bn(t);
        return this.db.getTargetCache().getTargetCount(t).next((function(t) {
            return e.next((function(e) {
                return t + e;
            }));
        }));
    }, t.prototype.Bn = function(t) {
        var e = 0;
        return this.Fn(t, (function(t) {
            e++;
        })).next((function() {
            return e;
        }));
    }, t.prototype.forEachTarget = function(t, e) {
        return this.db.getTargetCache().forEachTarget(t, e);
    }, t.prototype.Fn = function(t, e) {
        return this.Ln(t, (function(t, n) {
            return e(n);
        }));
    }, t.prototype.addReference = function(t, e, n) {
        return Bo(t, n);
    }, t.prototype.removeReference = function(t, e, n) {
        return Bo(t, n);
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return Bo(t, e);
    }, 
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    t.prototype.Un = function(t, e) {
        return function(t, e) {
            var n = !1;
            return ko(t).Y((function(r) {
                return xo(t, r, e).next((function(t) {
                    return t && (n = !0), kt.resolve(!t);
                }));
            })).next((function() {
                return n;
            }));
        }(t, e);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        var n = this, r = this.db.getRemoteDocumentCache().newChangeBuffer(), i = [], o = 0;
        return this.Ln(t, (function(u, s) {
            if (s <= e) {
                var a = n.Un(t, u).next((function(e) {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return o++, r.getEntry(t, u).next((function() {
                        return r.removeEntry(u, ft.min()), Ro(t).delete([ 0, oi(u.path) ]);
                    }));
                }));
                i.push(a);
            }
        })).next((function() {
            return kt.waitFor(i);
        })).next((function() {
            return r.apply(t);
        })).next((function() {
            return o;
        }));
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }, t.prototype.updateLimboDocument = function(t, e) {
        return Bo(t, e);
    }, 
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t.prototype.Ln = function(t, e) {
        var n, r = Ro(t), i = Kt.ot;
        return r.J({
            index: "documentTargetsIndex"
        }, (function(t, r) {
            var o = t[0];
            t[1];
            var u = r.path, s = r.sequenceNumber;
            0 === o ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== Kt.ot && e(new mt(ai(n)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = s, n = u) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = Kt.ot;
        })).next((function() {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== Kt.ot && e(new mt(ai(n)), i);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }, t;
}();

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */ function Bo(t, e) {
    return Ro(t).put(
    /**
 * @returns A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return {
            targetId: 0,
            path: oi(t.path),
            sequenceNumber: e
        };
    }(e, t.currentSequenceNumber));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */ var Ko = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written.
        this.changes = new or((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.changesApplied = !1
        /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */;
    }
    return t.prototype.addEntry = function(t) {
        this.assertNotApplied(), this.changes.set(t.key, t);
    }, 
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.removeEntry = function(t, e) {
        this.assertNotApplied(), this.changes.set(t, Le.newInvalidDocument(t).setReadTime(e));
    }, 
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */
    t.prototype.getEntry = function(t, e) {
        this.assertNotApplied();
        var n = this.changes.get(e);
        return void 0 !== n ? kt.resolve(n) : this.getFromCache(t, e);
    }, 
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */
    t.prototype.getEntries = function(t, e) {
        return this.getAllFromCache(t, e);
    }, 
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t.prototype.apply = function(t) {
        return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t);
    }, 
    /** Helper to assert this.changes is not null  */ t.prototype.assertNotApplied = function() {}, 
    t;
}(), Go = /** @class */ function() {
    function t(t) {
        this.wt = t;
    }
    return t.prototype.setIndexManager = function(t) {
        this.indexManager = t;
    }, 
    /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.addEntry = function(t, e, n) {
        return Wo(t).put(n);
    }, 
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.removeEntry = function(t, e, n) {
        return Wo(t).delete(
        /**
 * Returns a key that can be used for document lookups via the primary key of
 * the DbRemoteDocument object store.
 */
        function(t, e) {
            var n = t.path.toArray();
            return [ 
            /* prefix path */ n.slice(0, n.length - 2), 
            /* collection id */ n[n.length - 2], Ui(e), 
            /* document id */ n[n.length - 1] ];
        }(e, n));
    }, 
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    t.prototype.updateMetadata = function(t, e) {
        var n = this;
        return this.getMetadata(t).next((function(r) {
            return r.byteSize += e, n.qn(t, r);
        }));
    }, t.prototype.getEntry = function(t, e) {
        var n = this, r = Le.newInvalidDocument(e);
        return Wo(t).J({
            index: "documentKeyIndex",
            range: IDBKeyRange.only(Ho(e))
        }, (function(t, i) {
            r = n.Kn(e, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */
    t.prototype.Gn = function(t, e) {
        var n = this, r = {
            size: 0,
            document: Le.newInvalidDocument(e)
        };
        return Wo(t).J({
            index: "documentKeyIndex",
            range: IDBKeyRange.only(Ho(e))
        }, (function(t, i) {
            r = {
                document: n.Kn(e, i),
                size: Do(i)
            };
        })).next((function() {
            return r;
        }));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = sr();
        return this.Qn(t, e, (function(t, e) {
            var i = n.Kn(t, e);
            r = r.insert(t, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */
    t.prototype.jn = function(t, e) {
        var n = this, r = sr(), i = new Qt(mt.comparator);
        return this.Qn(t, e, (function(t, e) {
            var o = n.Kn(t, e);
            r = r.insert(t, o), i = i.insert(t, Do(e));
        })).next((function() {
            return {
                documents: r,
                Wn: i
            };
        }));
    }, t.prototype.Qn = function(t, e, n) {
        if (e.isEmpty()) return kt.resolve();
        var i = new Yt(Jo);
        e.forEach((function(t) {
            return i = i.add(t);
        }));
        var o = IDBKeyRange.bound(Ho(i.first()), Ho(i.last())), u = i.getIterator(), s = u.getNext();
        return Wo(t).J({
            index: "documentKeyIndex",
            range: o
        }, (function(t, e, i) {
            // Go through keys not found in cache.
            for (var o = mt.fromSegments(r(r([], e.prefixPath), [ e.collectionGroup, e.documentId ])); s && Jo(s, o) < 0; ) n(s, null), 
            s = u.getNext();
            s && s.isEqual(o) && (
            // Key found in cache.
            n(s, e), s = u.hasNext() ? u.getNext() : null), 
            // Skip to the next key (if there is one).
            s ? i.q(Ho(s)) : i.done();
        })).next((function() {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;s; ) n(s, null), s = u.hasNext() ? u.getNext() : null;
        }));
    }, t.prototype.getAllFromCollection = function(t, e, n) {
        var r = this, i = [ e.popLast().toArray(), e.lastSegment(), Ui(n.readTime), n.documentKey.path.isEmpty() ? "" : n.documentKey.path.lastSegment() ], o = [ e.popLast().toArray(), e.lastSegment(), [ Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ], "" ];
        return Wo(t).K(IDBKeyRange.bound(i, o, !0)).next((function(t) {
            for (var e = sr(), n = 0, i = t; n < i.length; n++) {
                var o = i[n], u = r.Kn(mt.fromSegments(o.prefixPath.concat(o.collectionGroup, o.documentId)), o);
                e = e.insert(u.key, u);
            }
            return e;
        }));
    }, t.prototype.getAllFromCollectionGroup = function(t, e, n, r) {
        var i = this, o = sr(), u = Yo(e, n), s = Yo(e, Dt.max());
        return Wo(t).J({
            index: "collectionGroupIndex",
            range: IDBKeyRange.bound(u, s, !0)
        }, (function(t, e, n) {
            var u = i.Kn(mt.fromSegments(e.prefixPath.concat(e.collectionGroup, e.documentId)), e);
            (o = o.insert(u.key, u)).size === r && n.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        return new zo(this, !!t && t.trackRemovals);
    }, t.prototype.getSize = function(t) {
        return this.getMetadata(t).next((function(t) {
            return t.byteSize;
        }));
    }, t.prototype.getMetadata = function(t) {
        return Qo(t).get("remoteDocumentGlobalKey").next((function(t) {
            return z(!!t), t;
        }));
    }, t.prototype.qn = function(t, e) {
        return Qo(t).put("remoteDocumentGlobalKey", e);
    }, 
    /**
     * Decodes `dbRemoteDoc` and returns the document (or an invalid document if
     * the document corresponds to the format used for sentinel deletes).
     */
    t.prototype.Kn = function(t, e) {
        if (e) {
            var n = 
            /** Decodes a remote document from storage locally to a Document. */ function(t, e) {
                var n;
                if (e.document) n = jr(t.ne, e.document, !!e.hasCommittedMutations); else if (e.noDocument) {
                    var r = mt.fromSegments(e.noDocument.path), i = Ki(e.noDocument.readTime);
                    n = Le.newNoDocument(r, i), e.hasCommittedMutations && n.setHasCommittedMutations();
                } else {
                    if (!e.unknownDocument) return j();
                    var o = mt.fromSegments(e.unknownDocument.path), u = Ki(e.unknownDocument.version);
                    n = Le.newUnknownDocument(o, u);
                }
                return e.readTime && n.setReadTime(function(t) {
                    var e = new ht(t[0], t[1]);
                    return ft.fromTimestamp(e);
                }(e.readTime)), n;
            }(this.wt, e);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
                        if (!n.isNoDocument() || !n.version.isEqual(ft.min())) return n;
        }
        return Le.newInvalidDocument(t);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newIndexedDbRemoteDocumentCache()`.
 */
/** Creates a new IndexedDbRemoteDocumentCache. */ function jo(t) {
    return new Go(t);
}

/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */ var zo = /** @class */ function(e) {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).zn = t, r.trackRemovals = n, 
        // A map of document sizes and read times prior to applying the changes in
        // this buffer.
        r.Hn = new or((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), r;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [], r = 0, i = new Yt((function(t, e) {
            return at(t.canonicalString(), e.canonicalString());
        }));
        return this.changes.forEach((function(o, u) {
            var s = e.Hn.get(o);
            if (n.push(e.zn.removeEntry(t, o, s.readTime)), u.isValidDocument()) {
                var a = qi(e.zn.wt, u);
                i = i.add(o.path.popLast());
                var c = Do(a);
                r += c - s.size, n.push(e.zn.addEntry(t, o, a));
            } else if (r -= s.size, e.trackRemovals) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                var l = qi(e.zn.wt, u.convertToNoDocument(ft.min()));
                n.push(e.zn.addEntry(t, o, l));
            }
        })), i.forEach((function(r) {
            n.push(e.zn.indexManager.addToCollectionParentIndex(t, r));
        })), n.push(this.zn.updateMetadata(t, r)), kt.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute a delta later.
                return this.zn.Gn(t, e).next((function(t) {
            return n.Hn.set(e, {
                size: t.size,
                readTime: t.document.readTime
            }), t.document;
        }));
    }, n.prototype.getAllFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
                return this.zn.jn(t, e).next((function(t) {
            var e = t.documents;
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `MutableDocumentMap` directly, without a conversion.
            return t.Wn.forEach((function(t, r) {
                n.Hn.set(t, {
                    size: r,
                    readTime: e.get(t).readTime
                });
            })), e;
        }));
    }, n;
}(Ko);

function Qo(t) {
    return Oi(t, "remoteDocumentGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function Wo(t) {
    return Oi(t, "remoteDocumentsV14");
}

/**
 * Returns a key that can be used for document lookups on the
 * `DbRemoteDocumentDocumentKeyIndex` index.
 */ function Ho(t) {
    var e = t.path.toArray();
    return [ 
    /* prefix path */ e.slice(0, e.length - 2), 
    /* collection id */ e[e.length - 2], 
    /* document id */ e[e.length - 1] ];
}

function Yo(t, e) {
    var n = e.documentKey.path.toArray();
    return [ 
    /* collection id */ t, Ui(e.readTime), 
    /* prefix path */ n.slice(0, n.length - 2), 
    /* document id */ n.length > 0 ? n[n.length - 1] : "" ];
}

/**
 * Comparator that compares document keys according to the primary key sorting
 * used by the `DbRemoteDocumentDocument` store (by prefix path, collection id
 * and then document ID).
 *
 * Visible for testing.
 */ function Jo(t, e) {
    for (var n = t.path.toArray(), r = e.path.toArray(), i = 0, o = 0
    // The ordering is based on https://chromium.googlesource.com/chromium/blink/+/fe5c21fef94dae71c1c3344775b8d8a7f7e6d9ec/Source/modules/indexeddb/IDBKey.cpp#74
    ; o < n.length - 2 && o < r.length - 2; ++o) if (i = at(n[o], r[o])) return i;
    return (i = at(n.length, r.length)) || ((i = at(n[n.length - 2], r[r.length - 2])) || at(n[n.length - 1], r[r.length - 1]));
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a local view (overlay) of a document, and the fields that are
 * locally mutated.
 */ var Xo = function(t, 
/**
     * The fields that are locally mutated by patch mutations. If the overlayed
     * document is from set or delete mutations, this returns null.
     */
e) {
    this.overlayedDocument = t, this.mutatedFields = e;
}, $o = /** @class */ function() {
    function t(t, e, n, r) {
        this.remoteDocumentCache = t, this.mutationQueue = e, this.documentOverlayCache = n, 
        this.indexManager = r
        /**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */;
    }
    return t.prototype.getDocument = function(t, e) {
        var n = this, r = null;
        return this.documentOverlayCache.getOverlay(t, e).next((function(i) {
            return r = i, n.getBaseDocument(t, e, r);
        })).next((function(t) {
            return null !== r && jn(r.mutation, t, $t.empty(), ht.now()), t;
        }));
    }, 
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t.prototype.getDocuments = function(t, e) {
        var n = this;
        return this.remoteDocumentCache.getEntries(t, e).next((function(e) {
            return n.getLocalViewOfDocuments(t, e, yr()).next((function() {
                return e;
            }));
        }));
    }, 
    /**
     * Similar to `getDocuments`, but creates the local view from the given
     * `baseDocs` without retrieving documents from the local store.
     *
     * @param transaction - The transaction this operation is scoped to.
     * @param docs - The documents to apply local mutations to get the local views.
     * @param existenceStateChanged - The set of document keys whose existence state
     *   is changed. This is useful to determine if some documents overlay needs
     *   to be recalculated.
     */
    t.prototype.getLocalViewOfDocuments = function(t, e, n) {
        var r = this;
        void 0 === n && (n = yr());
        var i = hr();
        return this.populateOverlays(t, i, e).next((function() {
            return r.computeViews(t, e, i, n).next((function(t) {
                var e = cr();
                return t.forEach((function(t, n) {
                    e = e.insert(t, n.overlayedDocument);
                })), e;
            }));
        }));
    }, 
    /**
     * Gets the overlayed documents for the given document map, which will include
     * the local view of those documents and a `FieldMask` indicating which fields
     * are mutated locally, `null` if overlay is a Set or Delete mutation.
     */
    t.prototype.getOverlayedDocuments = function(t, e) {
        var n = this, r = hr();
        return this.populateOverlays(t, r, e).next((function() {
            return n.computeViews(t, e, r, yr());
        }));
    }, 
    /**
     * Fetches the overlays for {@code docs} and adds them to provided overlay map
     * if the map does not already contain an entry for the given document key.
     */
    t.prototype.populateOverlays = function(t, e, n) {
        var r = [];
        return n.forEach((function(t) {
            e.has(t) || r.push(t);
        })), this.documentOverlayCache.getOverlays(t, r).next((function(t) {
            t.forEach((function(t, n) {
                e.set(t, n);
            }));
        }));
    }, 
    /**
     * Computes the local view for the given documents.
     *
     * @param docs - The documents to compute views for. It also has the base
     *   version of the documents.
     * @param overlays - The overlays that need to be applied to the given base
     *   version of the documents.
     * @param existenceStateChanged - A set of documents whose existence states
     *   might have changed. This is used to determine if we need to re-calculate
     *   overlays from mutation queues.
     * @return A map represents the local documents view.
     */
    t.prototype.computeViews = function(t, e, n, r) {
        var i = sr(), o = dr(), u = dr();
        return e.forEach((function(t, e) {
            var u = n.get(e.key);
            // Recalculate an overlay if the document's existence state changed due to
            // a remote event *and* the overlay is a PatchMutation. This is because
            // document existence state can change if some patch mutation's
            // preconditions are met.
            // NOTE: we recalculate when `overlay` is undefined as well, because there
            // might be a patch mutation whose precondition does not match before the
            // change (hence overlay is undefined), but would now match.
                        r.has(e.key) && (void 0 === u || u.mutation instanceof Hn) ? i = i.insert(e.key, e) : void 0 !== u && (o.set(e.key, u.mutation.getFieldMask()), 
            jn(u.mutation, e, u.mutation.getFieldMask(), ht.now()));
        })), this.recalculateAndSaveOverlays(t, i).next((function(t) {
            return t.forEach((function(t, e) {
                return o.set(t, e);
            })), e.forEach((function(t, e) {
                var n;
                return u.set(t, new Xo(e, null !== (n = o.get(t)) && void 0 !== n ? n : null));
            })), u;
        }));
    }, t.prototype.recalculateAndSaveOverlays = function(t, e) {
        var n = this, r = dr(), i = new Qt((function(t, e) {
            return t - e;
        })), o = yr();
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t, e).next((function(t) {
            for (var n = function(t) {
                t.keys().forEach((function(n) {
                    var o = e.get(n);
                    if (null !== o) {
                        var u = r.get(n) || $t.empty();
                        u = t.applyToLocalView(o, u), r.set(n, u);
                        var s = (i.get(t.batchId) || yr()).add(n);
                        i = i.insert(t.batchId, s);
                    }
                }));
            }, o = 0, u = t; o < u.length; o++) {
                n(u[o]);
            }
        })).next((function() {
            // Iterate in descending order of batch IDs, and skip documents that are
            // already saved.
            for (var u = [], s = i.getReverseIterator(), a = function() {
                var i = s.getNext(), a = i.key, c = i.value, l = fr();
                c.forEach((function(t) {
                    if (!o.has(t)) {
                        var n = Kn(e.get(t), r.get(t));
                        null !== n && l.set(t, n), o = o.add(t);
                    }
                })), u.push(n.documentOverlayCache.saveOverlays(t, a, l));
            }; s.hasNext(); ) a();
            return kt.waitFor(u);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Recalculates overlays by reading the documents from remote document cache
     * first, and saves them after they are calculated.
     */
    t.prototype.recalculateAndSaveOverlaysForDocumentKeys = function(t, e) {
        var n = this;
        return this.remoteDocumentCache.getEntries(t, e).next((function(e) {
            return n.recalculateAndSaveOverlays(t, e);
        }));
    }, 
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param offset - Read time and key to start scanning by (exclusive).
     */
    t.prototype.getDocumentsMatchingQuery = function(t, e, n) {
        /**
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */
        return function(t) {
            return mt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.getDocumentsMatchingDocumentQuery(t, e.path) : hn(e) ? this.getDocumentsMatchingCollectionGroupQuery(t, e, n) : this.getDocumentsMatchingCollectionQuery(t, e, n);
    }, 
    /**
     * Given a collection group, returns the next documents that follow the provided offset, along
     * with an updated batch ID.
     *
     * <p>The documents returned by this method are ordered by remote version from the provided
     * offset. If there are no more remote documents after the provided offset, documents with
     * mutations in order of batch id from the offset are returned. Since all documents in a batch are
     * returned together, the total number of documents returned can exceed {@code count}.
     *
     * @param transaction
     * @param collectionGroup The collection group for the documents.
     * @param offset The offset to index into.
     * @param count The number of documents to return
     * @return A LocalWriteResult with the documents that follow the provided offset and the last processed batch id.
     */
    t.prototype.getNextDocuments = function(t, e, n, r) {
        var i = this;
        return this.remoteDocumentCache.getAllFromCollectionGroup(t, e, n, r).next((function(o) {
            var u = r - o.size > 0 ? i.documentOverlayCache.getOverlaysForCollectionGroup(t, e, n.largestBatchId, r - o.size) : kt.resolve(hr()), s = -1, a = o;
            // The callsite will use the largest batch ID together with the latest read time to create
            // a new index offset. Since we only process batch IDs if all remote documents have been read,
            // no overlay will increase the overall read time. This is why we only need to special case
            // the batch id.
                        return u.next((function(e) {
                return kt.forEach(e, (function(e, n) {
                    return s < n.largestBatchId && (s = n.largestBatchId), o.get(e) ? kt.resolve() : i.getBaseDocument(t, e, n).next((function(t) {
                        a = a.insert(e, t);
                    }));
                })).next((function() {
                    return i.populateOverlays(t, e, o);
                })).next((function() {
                    return i.computeViews(t, a, e, yr());
                })).next((function(t) {
                    return {
                        batchId: s,
                        changes: lr(t)
                    };
                }));
            }));
        }));
    }, t.prototype.getDocumentsMatchingDocumentQuery = function(t, e) {
        // Just do a simple document lookup.
        return this.getDocument(t, new mt(e)).next((function(t) {
            var e = cr();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }, t.prototype.getDocumentsMatchingCollectionGroupQuery = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = cr();
        return this.indexManager.getCollectionParents(t, i).next((function(u) {
            return kt.forEach(u, (function(u) {
                var s = function(t, e) {
                    return new un(e, 
                    /*collectionGroup=*/ null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
                }(e, u.child(i));
                return r.getDocumentsMatchingCollectionQuery(t, s, n).next((function(t) {
                    t.forEach((function(t, e) {
                        o = o.insert(t, e);
                    }));
                }));
            })).next((function() {
                return o;
            }));
        }));
    }, t.prototype.getDocumentsMatchingCollectionQuery = function(t, e, n) {
        var r, i = this;
        // Query the remote documents and overlay mutations.
                return this.remoteDocumentCache.getAllFromCollection(t, e.path, n).next((function(o) {
            return r = o, i.documentOverlayCache.getOverlaysForCollection(t, e.path, n.largestBatchId);
        })).next((function(t) {
            // As documents might match the query because of their overlay we need to
            // include documents for all overlays in the initial document set.
            t.forEach((function(t, e) {
                var n = e.getKey();
                null === r.get(n) && (r = r.insert(n, Le.newInvalidDocument(n)));
            }));
            // Apply the overlays and match against the query.
            var n = cr();
            return r.forEach((function(r, i) {
                var o = t.get(r);
                void 0 !== o && jn(o.mutation, i, $t.empty(), ht.now()), 
                // Finally, insert the documents that still match the query
                gn(e, i) && (n = n.insert(r, i));
            })), n;
        }));
    }, 
    /** Returns a base document that can be used to apply `overlay`. */ t.prototype.getBaseDocument = function(t, e, n) {
        return null === n || 1 /* Patch */ === n.mutation.type ? this.remoteDocumentCache.getEntry(t, e) : kt.resolve(Le.newInvalidDocument(e));
    }, t;
}(), Zo = /** @class */ function() {
    function t(t) {
        this.wt = t, this.Jn = new Map, this.Yn = new Map;
    }
    return t.prototype.getBundleMetadata = function(t, e) {
        return kt.resolve(this.Jn.get(e));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        var n;
        return this.Jn.set(e.id, {
            id: (n = e).id,
            version: n.version,
            createTime: Mr(n.createTime)
        }), kt.resolve();
    }, t.prototype.getNamedQuery = function(t, e) {
        return kt.resolve(this.Yn.get(e));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return this.Yn.set(e.name, function(t) {
            return {
                name: t.name,
                query: Qi(t.bundledQuery),
                readTime: Mr(t.readTime)
            };
        }(e)), kt.resolve();
    }, t;
}(), tu = /** @class */ function() {
    function t() {
        // A map sorted by DocumentKey, whose value is a pair of the largest batch id
        // for the overlay and the overlay itself.
        this.overlays = new Qt(mt.comparator), this.Xn = new Map;
    }
    return t.prototype.getOverlay = function(t, e) {
        return kt.resolve(this.overlays.get(e));
    }, t.prototype.getOverlays = function(t, e) {
        var n = this, r = hr();
        return kt.forEach(e, (function(e) {
            return n.getOverlay(t, e).next((function(t) {
                null !== t && r.set(e, t);
            }));
        })).next((function() {
            return r;
        }));
    }, t.prototype.saveOverlays = function(t, e, n) {
        var r = this;
        return n.forEach((function(n, i) {
            r.ie(t, e, i);
        })), kt.resolve();
    }, t.prototype.removeOverlaysForBatchId = function(t, e, n) {
        var r = this, i = this.Xn.get(n);
        return void 0 !== i && (i.forEach((function(t) {
            return r.overlays = r.overlays.remove(t);
        })), this.Xn.delete(n)), kt.resolve();
    }, t.prototype.getOverlaysForCollection = function(t, e, n) {
        for (var r = hr(), i = e.length + 1, o = new mt(e.child("")), u = this.overlays.getIteratorFrom(o); u.hasNext(); ) {
            var s = u.getNext().value, a = s.getKey();
            if (!e.isPrefixOf(a.path)) break;
            // Documents from sub-collections
                        a.path.length === i && s.largestBatchId > n && r.set(s.getKey(), s);
        }
        return kt.resolve(r);
    }, t.prototype.getOverlaysForCollectionGroup = function(t, e, n, r) {
        for (var i = new Qt((function(t, e) {
            return t - e;
        })), o = this.overlays.getIterator(); o.hasNext(); ) {
            var u = o.getNext().value;
            if (u.getKey().getCollectionGroup() === e && u.largestBatchId > n) {
                var s = i.get(u.largestBatchId);
                null === s && (s = hr(), i = i.insert(u.largestBatchId, s)), s.set(u.getKey(), u);
            }
        }
        for (var a = hr(), c = i.getIterator(); c.hasNext() && (c.getNext().value.forEach((function(t, e) {
            return a.set(t, e);
        })), !(a.size() >= r)); ) ;
        return kt.resolve(a);
    }, t.prototype.ie = function(t, e, n) {
        // Remove the association of the overlay to its batch id.
        var r = this.overlays.get(n.key);
        if (null !== r) {
            var i = this.Xn.get(r.largestBatchId).delete(n.key);
            this.Xn.set(r.largestBatchId, i);
        }
        this.overlays = this.overlays.insert(n.key, new Li(e, n));
        // Create the association of this overlay to the given largestBatchId.
        var o = this.Xn.get(e);
        void 0 === o && (o = yr(), this.Xn.set(e, o)), this.Xn.set(e, o.add(n.key));
    }, t;
}(), eu = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Zn = new Yt(nu.ts), 
        // A set of outstanding references to a document sorted by target id.
        this.es = new Yt(nu.ns)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.isEmpty = function() {
        return this.Zn.isEmpty();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.addReference = function(t, e) {
        var n = new nu(t, e);
        this.Zn = this.Zn.add(n), this.es = this.es.add(n);
    }, 
    /** Add references to the given document keys for the given ID. */ t.prototype.ss = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.addReference(t, e);
        }));
    }, 
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t.prototype.removeReference = function(t, e) {
        this.rs(new nu(t, e));
    }, t.prototype.os = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.removeReference(t, e);
        }));
    }, 
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t.prototype.us = function(t) {
        var e = this, n = new mt(new pt([])), r = new nu(n, t), i = new nu(n, t + 1), o = [];
        return this.es.forEachInRange([ r, i ], (function(t) {
            e.rs(t), o.push(t.key);
        })), o;
    }, t.prototype.cs = function() {
        var t = this;
        this.Zn.forEach((function(e) {
            return t.rs(e);
        }));
    }, t.prototype.rs = function(t) {
        this.Zn = this.Zn.delete(t), this.es = this.es.delete(t);
    }, t.prototype.hs = function(t) {
        var e = new mt(new pt([])), n = new nu(e, t), r = new nu(e, t + 1), i = yr();
        return this.es.forEachInRange([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.containsKey = function(t) {
        var e = new nu(t, 0), n = this.Zn.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), nu = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.ls = e
        /** Compare by key then by ID */;
    }
    return t.ts = function(t, e) {
        return mt.comparator(t.key, e.key) || at(t.ls, e.ls);
    }, 
    /** Compare by ID then by key */ t.ns = function(t, e) {
        return at(t.ls, e.ls) || mt.comparator(t.key, e.key);
    }, t;
}(), ru = /** @class */ function() {
    function t(t, e) {
        this.indexManager = t, this.referenceDelegate = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this.mutationQueue = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.fs = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.ds = new Yt(nu.ts);
    }
    return t.prototype.checkEmpty = function(t) {
        return kt.resolve(0 === this.mutationQueue.length);
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this.fs;
        this.fs++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
        var o = new Mi(i, e, n, r);
        this.mutationQueue.push(o);
        // Track references by document key and index collection parents.
        for (var u = 0, s = r; u < s.length; u++) {
            var a = s[u];
            this.ds = this.ds.add(new nu(a.key, i)), this.indexManager.addToCollectionParentIndex(t, a.key.path.popLast());
        }
        return kt.resolve(o);
    }, t.prototype.lookupMutationBatch = function(t, e) {
        return kt.resolve(this._s(e));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = e + 1, r = this.ws(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return kt.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
    }, t.prototype.getHighestUnacknowledgedBatchId = function() {
        return kt.resolve(0 === this.mutationQueue.length ? -1 : this.fs - 1);
    }, t.prototype.getAllMutationBatches = function(t) {
        return kt.resolve(this.mutationQueue.slice());
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = new nu(e, 0), i = new nu(e, Number.POSITIVE_INFINITY), o = [];
        return this.ds.forEachInRange([ r, i ], (function(t) {
            var e = n._s(t.ls);
            o.push(e);
        })), kt.resolve(o);
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new Yt(at);
        return e.forEach((function(t) {
            var e = new nu(t, 0), i = new nu(t, Number.POSITIVE_INFINITY);
            n.ds.forEachInRange([ e, i ], (function(t) {
                r = r.add(t.ls);
            }));
        })), kt.resolve(this.gs(r));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                mt.isDocumentKey(i) || (i = i.child(""));
        var o = new nu(new mt(i), 0), u = new Yt(at);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                return this.ds.forEachWhile((function(t) {
            var e = t.key.path;
            return !!n.isPrefixOf(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === r && (u = u.add(t.ls)), !0);
        }), o), kt.resolve(this.gs(u));
    }, t.prototype.gs = function(t) {
        var e = this, n = [];
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
                return t.forEach((function(t) {
            var r = e._s(t);
            null !== r && n.push(r);
        })), n;
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        z(0 === this.ys(e.batchId, "removed")), this.mutationQueue.shift();
        var r = this.ds;
        return kt.forEach(e.mutations, (function(i) {
            var o = new nu(i.key, e.batchId);
            return r = r.delete(o), n.referenceDelegate.markPotentiallyOrphaned(t, i.key);
        })).next((function() {
            n.ds = r;
        }));
    }, t.prototype.In = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.containsKey = function(t, e) {
        var n = new nu(e, 0), r = this.ds.firstAfterOrEqual(n);
        return kt.resolve(e.isEqual(r && r.key));
    }, t.prototype.performConsistencyCheck = function(t) {
        return this.mutationQueue.length, kt.resolve();
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t.prototype.ys = function(t, e) {
        return this.ws(t);
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    t.prototype.ws = function(t) {
        return 0 === this.mutationQueue.length ? 0 : t - this.mutationQueue[0].batchId;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        }, 
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t.prototype._s = function(t) {
        var e = this.ws(t);
        return e < 0 || e >= this.mutationQueue.length ? null : this.mutationQueue[e];
    }, t;
}(), iu = /** @class */ function() {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    function t(t) {
        this.ps = t, 
        /** Underlying cache of documents and their read times. */
        this.docs = new Qt(mt.comparator), 
        /** Size of all cached documents. */
        this.size = 0;
    }
    return t.prototype.setIndexManager = function(t) {
        this.indexManager = t;
    }, 
    /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.addEntry = function(t, e) {
        var n = e.key, r = this.docs.get(n), i = r ? r.size : 0, o = this.ps(e);
        return this.docs = this.docs.insert(n, {
            document: e.mutableCopy(),
            size: o
        }), this.size += o - i, this.indexManager.addToCollectionParentIndex(t, n.path.popLast());
    }, 
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.removeEntry = function(t) {
        var e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }, t.prototype.getEntry = function(t, e) {
        var n = this.docs.get(e);
        return kt.resolve(n ? n.document.mutableCopy() : Le.newInvalidDocument(e));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = sr();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.insert(t, e ? e.document.mutableCopy() : Le.newInvalidDocument(t));
        })), kt.resolve(r);
    }, t.prototype.getAllFromCollection = function(t, e, n) {
        for (var r = sr(), i = new mt(e.child("")), o = this.docs.getIteratorFrom(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.hasNext(); ) {
            var u = o.getNext(), s = u.key, a = u.value.document;
            if (!e.isPrefixOf(s.path)) break;
            s.path.length > e.length + 1 || _t(St(a), n) <= 0 || (r = r.insert(a.key, a.mutableCopy()));
        }
        return kt.resolve(r);
    }, t.prototype.getAllFromCollectionGroup = function(t, e, n, r) {
        // This method should only be called from the IndexBackfiller if persistence
        // is enabled.
        j();
    }, t.prototype.Is = function(t, e) {
        return kt.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new ou(this);
    }, t.prototype.getSize = function(t) {
        return kt.resolve(this.size);
    }, t;
}(), ou = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).zn = t, n;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [];
        return this.changes.forEach((function(r, i) {
            i.isValidDocument() ? n.push(e.zn.addEntry(t, i)) : e.zn.removeEntry(r);
        })), kt.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        return this.zn.getEntry(t, e);
    }, n.prototype.getAllFromCache = function(t, e) {
        return this.zn.getEntries(t, e);
    }, n;
}(Ko), uu = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.Ts = new or((function(t) {
            return qe(t);
        }), Ue), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = ft.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.Es = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this.As = new eu, this.targetCount = 0, this.Rs = Co.An();
    }
    return t.prototype.forEachTarget = function(t, e) {
        return this.Ts.forEach((function(t, n) {
            return e(n);
        })), kt.resolve();
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return kt.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return kt.resolve(this.Es);
    }, t.prototype.allocateTargetId = function(t) {
        return this.highestTargetId = this.Rs.next(), kt.resolve(this.highestTargetId);
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.Es && (this.Es = e), 
        kt.resolve();
    }, t.prototype.vn = function(t) {
        this.Ts.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.Rs = new Co(e), this.highestTargetId = e), t.sequenceNumber > this.Es && (this.Es = t.sequenceNumber);
    }, t.prototype.addTargetData = function(t, e) {
        return this.vn(e), this.targetCount += 1, kt.resolve();
    }, t.prototype.updateTargetData = function(t, e) {
        return this.vn(e), kt.resolve();
    }, t.prototype.removeTargetData = function(t, e) {
        return this.Ts.delete(e.target), this.As.us(e.targetId), this.targetCount -= 1, 
        kt.resolve();
    }, t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.Ts.forEach((function(u, s) {
            s.sequenceNumber <= e && null === n.get(s.targetId) && (r.Ts.delete(u), o.push(r.removeMatchingKeysForTargetId(t, s.targetId)), 
            i++);
        })), kt.waitFor(o).next((function() {
            return i;
        }));
    }, t.prototype.getTargetCount = function(t) {
        return kt.resolve(this.targetCount);
    }, t.prototype.getTargetData = function(t, e) {
        var n = this.Ts.get(e) || null;
        return kt.resolve(n);
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        return this.As.ss(e, n), kt.resolve();
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        this.As.os(e, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && e.forEach((function(e) {
            i.push(r.markPotentiallyOrphaned(t, e));
        })), kt.waitFor(i);
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        return this.As.us(e), kt.resolve();
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = this.As.hs(e);
        return kt.resolve(n);
    }, t.prototype.containsKey = function(t, e) {
        return kt.resolve(this.As.containsKey(e));
    }, t;
}(), su = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t, e) {
        var n = this;
        this.bs = {}, this.overlays = {}, this.Ps = new Kt(0), this.vs = !1, this.vs = !0, 
        this.referenceDelegate = t(this), this.Vs = new uu(this), this.indexManager = new fo, 
        this.remoteDocumentCache = new iu((function(t) {
            return n.referenceDelegate.Ss(t);
        })), this.wt = new Pi(e), this.Ds = new Zo(this.wt);
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, t.prototype.shutdown = function() {
        // No durable state to ensure is closed on shutdown.
        return this.vs = !1, Promise.resolve();
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return this.vs;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.setDatabaseDeletedListener = function() {
        // No op.
    }, t.prototype.setNetworkEnabled = function() {
        // No op.
    }, t.prototype.getIndexManager = function(t) {
        // We do not currently support indices for memory persistence, so we can
        // return the same shared instance of the memory index manager.
        return this.indexManager;
    }, t.prototype.getDocumentOverlayCache = function(t) {
        var e = this.overlays[t.toKey()];
        return e || (e = new tu, this.overlays[t.toKey()] = e), e;
    }, t.prototype.getMutationQueue = function(t, e) {
        var n = this.bs[t.toKey()];
        return n || (n = new ru(e, this.referenceDelegate), this.bs[t.toKey()] = n), n;
    }, t.prototype.getTargetCache = function() {
        return this.Vs;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.remoteDocumentCache;
    }, t.prototype.getBundleCache = function() {
        return this.Ds;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        U("MemoryPersistence", "Starting transaction:", t);
        var i = new au(this.Ps.next());
        return this.referenceDelegate.Cs(), n(i).next((function(t) {
            return r.referenceDelegate.xs(i).next((function() {
                return t;
            }));
        })).toPromise().then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, t.prototype.Ns = function(t, e) {
        return kt.or(Object.values(this.bs).map((function(n) {
            return function() {
                return n.containsKey(t, e);
            };
        })));
    }, t;
}(), au = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).currentSequenceNumber = t, n;
    }
    return t(n, e), n;
}(Nt), cu = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.ks = new eu, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.Os = null;
    }
    return t.Ms = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "Fs", {
        get: function() {
            if (this.Os) return this.Os;
            throw j();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.addReference = function(t, e, n) {
        return this.ks.addReference(n, e), this.Fs.delete(n.toString()), kt.resolve();
    }, t.prototype.removeReference = function(t, e, n) {
        return this.ks.removeReference(n, e), this.Fs.add(n.toString()), kt.resolve();
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return this.Fs.add(e.toString()), kt.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.ks.us(e.targetId).forEach((function(t) {
            return n.Fs.add(t.toString());
        }));
        var r = this.persistence.getTargetCache();
        return r.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.Fs.add(t.toString());
            }));
        })).next((function() {
            return r.removeTargetData(t, e);
        }));
    }, t.prototype.Cs = function() {
        this.Os = new Set;
    }, t.prototype.xs = function(t) {
        var e = this, n = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        // Remove newly orphaned documents.
                return kt.forEach(this.Fs, (function(r) {
            var i = mt.fromPath(r);
            return e.$s(t, i).next((function(t) {
                t || n.removeEntry(i, ft.min());
            }));
        })).next((function() {
            return e.Os = null, n.apply(t);
        }));
    }, t.prototype.updateLimboDocument = function(t, e) {
        var n = this;
        return this.$s(t, e).next((function(t) {
            t ? n.Fs.delete(e.toString()) : n.Fs.add(e.toString());
        }));
    }, t.prototype.Ss = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.$s = function(t, e) {
        var n = this;
        return kt.or([ function() {
            return kt.resolve(n.ks.containsKey(e));
        }, function() {
            return n.persistence.getTargetCache().containsKey(t, e);
        }, function() {
            return n.persistence.Ns(t, e);
        } ]);
    }, t;
}(), lu = /** @class */ function() {
    function t(t) {
        this.wt = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    return t.prototype.O = function(t, e, n, r) {
        var i = this, o = new Ct("createOrUpgrade", e);
        n < 1 && r >= 1 && (function(t) {
            t.createObjectStore("owner");
        }(t), function(t) {
            t.createObjectStore("mutationQueues", {
                keyPath: "userId"
            }), t.createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0
            }).createIndex("userMutationsIndex", ci, {
                unique: !0
            }), t.createObjectStore("documentMutations");
        }(t), hu(t), function(t) {
            t.createObjectStore("remoteDocuments");
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        var u = kt.resolve();
        return n < 3 && r >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (function(t) {
            t.deleteObjectStore("targetDocuments"), t.deleteObjectStore("targets"), t.deleteObjectStore("targetGlobal");
        }(t), hu(t)), u = u.next((function() {
            /**
     * Creates the target global singleton row.
     *
     * @param txn - The version upgrade transaction for indexeddb
     */
            return function(t) {
                var e = t.store("targetGlobal"), n = {
                    highestTargetId: 0,
                    highestListenSequenceNumber: 0,
                    lastRemoteSnapshotVersion: ft.min().toTimestamp(),
                    targetCount: 0
                };
                return e.put("targetGlobalKey", n);
            }(o);
        }))), n < 4 && r >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        u = u.next((function() {
            return function(t, e) {
                return e.store("mutations").K().next((function(n) {
                    t.deleteObjectStore("mutations"), t.createObjectStore("mutations", {
                        keyPath: "batchId",
                        autoIncrement: !0
                    }).createIndex("userMutationsIndex", ci, {
                        unique: !0
                    });
                    var r = e.store("mutations"), i = n.map((function(t) {
                        return r.put(t);
                    }));
                    return kt.waitFor(i);
                }));
            }(t, o);
        }))), u = u.next((function() {
            !function(t) {
                t.createObjectStore("clientMetadata", {
                    keyPath: "clientId"
                });
            }(t);
        }))), n < 5 && r >= 5 && (u = u.next((function() {
            return i.Bs(o);
        }))), n < 6 && r >= 6 && (u = u.next((function() {
            return function(t) {
                t.createObjectStore("remoteDocumentGlobal");
            }(t), i.Ls(o);
        }))), n < 7 && r >= 7 && (u = u.next((function() {
            return i.Us(o);
        }))), n < 8 && r >= 8 && (u = u.next((function() {
            return i.qs(t, o);
        }))), n < 9 && r >= 9 && (u = u.next((function() {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t);
            // Note: Schema version 9 used to create a read time index for the
            // RemoteDocumentCache. This is now done with schema version 13.
                }))), n < 10 && r >= 10 && (u = u.next((function() {
            return i.Ks(o);
        }))), n < 11 && r >= 11 && (u = u.next((function() {
            !function(t) {
                t.createObjectStore("bundles", {
                    keyPath: "bundleId"
                });
            }(t), function(t) {
                t.createObjectStore("namedQueries", {
                    keyPath: "name"
                });
            }(t);
        }))), n < 12 && r >= 12 && (u = u.next((function() {
            !function(t) {
                var e = t.createObjectStore("documentOverlays", {
                    keyPath: Si
                });
                e.createIndex("collectionPathOverlayIndex", Di, {
                    unique: !1
                }), e.createIndex("collectionGroupOverlayIndex", _i, {
                    unique: !1
                });
            }(t);
        }))), n < 13 && r >= 13 && (u = u.next((function() {
            return function(t) {
                var e = t.createObjectStore("remoteDocumentsV14", {
                    keyPath: di
                });
                e.createIndex("documentKeyIndex", pi), e.createIndex("collectionGroupIndex", vi);
            }(t);
        })).next((function() {
            return i.Gs(t, o);
        })).next((function() {
            return t.deleteObjectStore("remoteDocuments");
        }))), n < 14 && r >= 14 && (u = u.next((function() {
            return i.Qs(t, o);
        }))), n < 15 && r >= 15 && (u = u.next((function() {
            return function(t) {
                t.createObjectStore("indexConfiguration", {
                    keyPath: "indexId",
                    autoIncrement: !0
                }).createIndex("collectionGroupIndex", "collectionGroup", {
                    unique: !1
                }), t.createObjectStore("indexState", {
                    keyPath: bi
                }).createIndex("sequenceNumberIndex", Ii, {
                    unique: !1
                }), t.createObjectStore("indexEntries", {
                    keyPath: Ei
                }).createIndex("documentKeyIndex", Ti, {
                    unique: !1
                });
            }(t);
        }))), u;
    }, t.prototype.Ls = function(t) {
        var e = 0;
        return t.store("remoteDocuments").J((function(t, n) {
            e += Do(n);
        })).next((function() {
            var n = {
                byteSize: e
            };
            return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", n);
        }));
    }, t.prototype.Bs = function(t) {
        var e = this, n = t.store("mutationQueues"), r = t.store("mutations");
        return n.K().next((function(n) {
            return kt.forEach(n, (function(n) {
                var i = IDBKeyRange.bound([ n.userId, -1 ], [ n.userId, n.lastAcknowledgedBatchId ]);
                return r.K("userMutationsIndex", i).next((function(r) {
                    return kt.forEach(r, (function(r) {
                        z(r.userId === n.userId);
                        var i = Gi(e.wt, r);
                        return So(t, n.userId, i).next((function() {}));
                    }));
                }));
            }));
        }));
    }, 
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t.prototype.Us = function(t) {
        var e = t.store("targetDocuments"), n = t.store("remoteDocuments");
        return t.store("targetGlobal").get("targetGlobalKey").next((function(t) {
            var r = [];
            return n.J((function(n, i) {
                var o = new pt(n), u = function(t) {
                    return [ 0, oi(t) ];
                }(o);
                r.push(e.get(u).next((function(n) {
                    return n ? kt.resolve() : function(n) {
                        return e.put({
                            targetId: 0,
                            path: oi(n),
                            sequenceNumber: t.highestListenSequenceNumber
                        });
                    }(o);
                })));
            })).next((function() {
                return kt.waitFor(r);
            }));
        }));
    }, t.prototype.qs = function(t, e) {
        // Create the index.
        t.createObjectStore("collectionParents", {
            keyPath: wi
        });
        var n = e.store("collectionParents"), r = new po, i = function(t) {
            if (r.add(t)) {
                var e = t.lastSegment(), i = t.popLast();
                return n.put({
                    collectionId: e,
                    parent: oi(i)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
        // Index existing remote documents.
                return e.store("remoteDocuments").J({
            H: !0
        }, (function(t, e) {
            var n = new pt(t);
            return i(n.popLast());
        })).next((function() {
            return e.store("documentMutations").J({
                H: !0
            }, (function(t, e) {
                t[0];
                var n = t[1];
                t[2];
                var r = ai(n);
                return i(r.popLast());
            }));
        }));
    }, t.prototype.Ks = function(t) {
        var e = this, n = t.store("targets");
        return n.J((function(t, r) {
            var i = ji(r), o = zi(e.wt, i);
            return n.put(o);
        }));
    }, t.prototype.Gs = function(t, e) {
        var n = e.store("remoteDocuments"), r = [];
        return n.J((function(t, n) {
            var i, o = e.store("remoteDocumentsV14"), u = (i = n, i.document ? new mt(pt.fromString(i.document.name).popFirst(5)) : i.noDocument ? mt.fromSegments(i.noDocument.path) : i.unknownDocument ? mt.fromSegments(i.unknownDocument.path) : j()).path.toArray(), s = {
                prefixPath: u.slice(0, u.length - 2),
                collectionGroup: u[u.length - 2],
                documentId: u[u.length - 1],
                readTime: n.readTime || [ 0, 0 ],
                unknownDocument: n.unknownDocument,
                noDocument: n.noDocument,
                document: n.document,
                hasCommittedMutations: !!n.hasCommittedMutations
            };
            r.push(o.put(s));
        })).next((function() {
            return kt.waitFor(r);
        }));
    }, t.prototype.Qs = function(t, e) {
        var n = this, r = e.store("mutations"), i = jo(this.wt), o = new su(cu.Ms, this.wt.ne);
        return r.K().next((function(t) {
            var r = new Map;
            return t.forEach((function(t) {
                var e, i = null !== (e = r.get(t.userId)) && void 0 !== e ? e : yr();
                Gi(n.wt, t).keys().forEach((function(t) {
                    return i = i.add(t);
                })), r.set(t.userId, i);
            })), kt.forEach(r, (function(t, r) {
                var u = new R(r), s = Zi.se(n.wt, u), a = o.getIndexManager(u), c = _o.se(u, n.wt, a, o.referenceDelegate);
                return new $o(i, c, s, a).recalculateAndSaveOverlaysForDocumentKeys(new Vi(e, Kt.ot), t).next();
            }));
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */ function hu(t) {
    t.createObjectStore("targetDocuments", {
        keyPath: mi
    }).createIndex("documentTargetsIndex", gi, {
        unique: !0
    }), 
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore("targets", {
        keyPath: "targetId"
    }).createIndex("queryTargetsIndex", yi, {
        unique: !0
    }), t.createObjectStore("targetGlobal");
}

var fu = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.", du = /** @class */ function() {
    function t(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    e, n, r, i, o, u, s, a, c, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    l, h) {
        if (void 0 === h && (h = 14), this.allowTabSynchronization = e, this.persistenceKey = n, 
        this.clientId = r, this.js = o, this.window = u, this.document = s, this.Ws = c, 
        this.zs = l, this.Hs = h, this.Ps = null, this.vs = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.Js = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.Ys = null, 
        /** The client metadata refresh task. */
        this.Xs = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.Zs = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.ti = function(t) {
            return Promise.resolve();
        }, !t.V()) throw new Y(H.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.referenceDelegate = new Uo(this, i), this.ei = n + "main", this.wt = new Pi(a), 
        this.ni = new Vt(this.ei, this.Hs, new lu(this.wt)), this.Vs = new Vo(this.referenceDelegate, this.wt), 
        this.remoteDocumentCache = jo(this.wt), this.Ds = new Ji, this.window && this.window.localStorage ? this.si = this.window.localStorage : (this.si = null, 
        !1 === l && B("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */    return t.prototype.start = function() {
        var t = this;
        // NOTE: This is expected to fail sometimes (in the case of another tab
        // already having the persistence lock), so it's the first thing we should
        // do.
                return this.ii().then((function() {
            if (!t.isPrimary && !t.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new Y(H.FAILED_PRECONDITION, fu);
            return t.ri(), t.oi(), t.ui(), t.runTransaction("getHighestListenSequenceNumber", "readonly", (function(e) {
                return t.Vs.getHighestSequenceNumber(e);
            }));
        })).then((function(e) {
            t.Ps = new Kt(e, t.Ws);
        })).then((function() {
            t.vs = !0;
        })).catch((function(e) {
            return t.ni && t.ni.close(), Promise.reject(e);
        }));
    }, 
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.ci = function(t) {
        var r = this;
        return this.ti = function(i) {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(e) {
                    return this.started ? [ 2 /*return*/ , t(i) ] : [ 2 /*return*/ ];
                }));
            }));
        }, t(this.isPrimary);
    }, 
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.setDatabaseDeletedListener = function(t) {
        var r = this;
        this.ni.F((function(i) {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return null === i.newVersion ? [ 4 /*yield*/ , t() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        e.sent(), e.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.setNetworkEnabled = function(t) {
        var r = this;
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.js.enqueueAndForget((function() {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return this.started ? [ 4 /*yield*/ , this.ii() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })));
    }, 
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    t.prototype.ii = function() {
        var t = this;
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (function(e) {
            return vu(e).put({
                clientId: t.clientId,
                updateTimeMs: Date.now(),
                networkEnabled: t.networkEnabled,
                inForeground: t.inForeground
            }).next((function() {
                if (t.isPrimary) return t.ai(e).next((function(e) {
                    e || (t.isPrimary = !1, t.js.enqueueRetryable((function() {
                        return t.ti(!1);
                    })));
                }));
            })).next((function() {
                return t.hi(e);
            })).next((function(n) {
                return t.isPrimary && !n ? t.li(e).next((function() {
                    return !1;
                })) : !!n && t.fi(e).next((function() {
                    return !0;
                }));
            }));
        })).catch((function(e) {
            if (Rt(e)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return U("IndexedDbPersistence", "Failed to extend owner lease: ", e), t.isPrimary;
            if (!t.allowTabSynchronization) throw e;
            return U("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), 
            /* isPrimary= */ !1;
        })).then((function(e) {
            t.isPrimary !== e && t.js.enqueueRetryable((function() {
                return t.ti(e);
            })), t.isPrimary = e;
        }));
    }, t.prototype.ai = function(t) {
        var e = this;
        return pu(t).get("owner").next((function(t) {
            return kt.resolve(e.di(t));
        }));
    }, t.prototype._i = function(t) {
        return vu(t).delete(this.clientId);
    }, 
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    t.prototype.wi = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return !this.isPrimary || this.mi(this.Zs, 18e5) ? [ 3 /*break*/ , 2 ] : (this.Zs = Date.now(), 
                    [ 4 /*yield*/ , this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (function(t) {
                        var e = Oi(t, "clientMetadata");
                        return e.K().next((function(t) {
                            var n = o.gi(t, 18e5), r = t.filter((function(t) {
                                return -1 === n.indexOf(t);
                            }));
                            // Delete metadata for clients that are no longer considered active.
                                                        return kt.forEach(r, (function(t) {
                                return e.delete(t.clientId);
                            })).next((function() {
                                return r;
                            }));
                        }));
                    })).catch((function() {
                        return [];
                    })) ]);

                  case 1:
                    // Delete potential leftover entries that may continue to mark the
                    // inactive clients as zombied in LocalStorage.
                    // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                    // the client atomically, but we can't. So we opt to delete the IndexedDb
                    // entries first to avoid potentially reviving a zombied client.
                    if (t = n.sent(), this.si) for (e = 0, r = t; e < r.length; e++) i = r[e], this.si.removeItem(this.yi(i.clientId));
                    n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    t.prototype.ui = function() {
        var t = this;
        this.Xs = this.js.enqueueAfterDelay("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (function() {
            return t.ii().then((function() {
                return t.wi();
            })).then((function() {
                return t.ui();
            }));
        }));
    }, 
    /** Checks whether `client` is the local client. */ t.prototype.di = function(t) {
        return !!t && t.ownerId === this.clientId;
    }, 
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    t.prototype.hi = function(t) {
        var e = this;
        return this.zs ? kt.resolve(!0) : pu(t).get("owner").next((function(n) {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (null !== n && e.mi(n.leaseTimestampMs, 5e3) && !e.pi(n.ownerId)) {
                if (e.di(n) && e.networkEnabled) return !0;
                if (!e.di(n)) {
                    if (!n.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new Y(H.FAILED_PRECONDITION, fu);
                    return !1;
                }
            }
            return !(!e.networkEnabled || !e.inForeground) || vu(t).K().next((function(t) {
                return void 0 === e.gi(t, 5e3).find((function(t) {
                    if (e.clientId !== t.clientId) {
                        var n = !e.networkEnabled && t.networkEnabled, r = !e.inForeground && t.inForeground, i = e.networkEnabled === t.networkEnabled;
                        if (n || r && i) return !0;
                    }
                    return !1;
                }));
            }));
        })).next((function(t) {
            return e.isPrimary !== t && U("IndexedDbPersistence", "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), 
            t;
        }));
    }, t.prototype.shutdown = function() {
        return e(this, void 0, void 0, (function() {
            var t = this;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
                    // has obtained the primary lease.
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return this.vs = !1, this.Ii(), this.Xs && (this.Xs.cancel(), this.Xs = null), this.Ti(), 
                    this.Ei(), [ 4 /*yield*/ , this.ni.runTransaction("shutdown", "readwrite", [ "owner", "clientMetadata" ], (function(e) {
                        var n = new Vi(e, Kt.ot);
                        return t.li(n).next((function() {
                            return t._i(n);
                        }));
                    })) ];

                  case 1:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
                    // has obtained the primary lease.
                    return e.sent(), this.ni.close(), 
                    // Remove the entry marking the client as zombied from LocalStorage since
                    // we successfully deleted its metadata from IndexedDb.
                    this.Ai(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    t.prototype.gi = function(t, e) {
        var n = this;
        return t.filter((function(t) {
            return n.mi(t.updateTimeMs, e) && !n.pi(t.clientId);
        }));
    }, 
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.Ri = function() {
        var t = this;
        return this.runTransaction("getActiveClients", "readonly", (function(e) {
            return vu(e).K().next((function(e) {
                return t.gi(e, 18e5).map((function(t) {
                    return t.clientId;
                }));
            }));
        }));
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return this.vs;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.getMutationQueue = function(t, e) {
        return _o.se(t, this.wt, e, this.referenceDelegate);
    }, t.prototype.getTargetCache = function() {
        return this.Vs;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.remoteDocumentCache;
    }, t.prototype.getIndexManager = function(t) {
        return new yo(t, this.wt.ne.databaseId);
    }, t.prototype.getDocumentOverlayCache = function(t) {
        return Zi.se(this.wt, t);
    }, t.prototype.getBundleCache = function() {
        return this.Ds;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        U("IndexedDbPersistence", "Starting transaction:", t);
        var i, o, u = "readonly" === e ? "readonly" : "readwrite", s = 15 === (i = this.Hs) ? Ci : 14 === i ? ki : 13 === i ? Ai : 12 === i ? Ni : 11 === i ? xi : void j();
        /** Returns the object stores for the provided schema. */        
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.ni.runTransaction(t, u, s, (function(i) {
            return o = new Vi(i, r.Ps ? r.Ps.next() : Kt.ot), "readwrite-primary" === e ? r.ai(o).next((function(t) {
                return !!t || r.hi(o);
            })).next((function(e) {
                if (!e) throw B("Failed to obtain primary lease for action '" + t + "'."), r.isPrimary = !1, 
                r.js.enqueueRetryable((function() {
                    return r.ti(!1);
                })), new Y(H.FAILED_PRECONDITION, xt);
                return n(o);
            })).next((function(t) {
                return r.fi(o).next((function() {
                    return t;
                }));
            })) : r.bi(o).next((function() {
                return n(o);
            }));
        })).then((function(t) {
            return o.raiseOnCommittedEvent(), t;
        }));
    }, 
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    t.prototype.bi = function(t) {
        var e = this;
        return pu(t).get("owner").next((function(t) {
            if (null !== t && e.mi(t.leaseTimestampMs, 5e3) && !e.pi(t.ownerId) && !e.di(t) && !(e.zs || e.allowTabSynchronization && t.allowTabSynchronization)) throw new Y(H.FAILED_PRECONDITION, fu);
        }));
    }, 
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t.prototype.fi = function(t) {
        var e = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now()
        };
        return pu(t).put("owner", e);
    }, t.V = function() {
        return Vt.V();
    }, 
    /** Checks the primary lease and removes it if we are the current primary. */ t.prototype.li = function(t) {
        var e = this, n = pu(t);
        return n.get("owner").next((function(t) {
            return e.di(t) ? (U("IndexedDbPersistence", "Releasing primary lease."), n.delete("owner")) : kt.resolve();
        }));
    }, 
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */ t.prototype.mi = function(t, e) {
        var n = Date.now();
        return !(t < n - e || t > n && (B("Detected an update time that is in the future: " + t + " > " + n), 
        1));
    }, t.prototype.ri = function() {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.Ys = function() {
            t.js.enqueueAndForget((function() {
                return t.inForeground = "visible" === t.document.visibilityState, t.ii();
            }));
        }, this.document.addEventListener("visibilitychange", this.Ys), this.inForeground = "visible" === this.document.visibilityState);
    }, t.prototype.Ti = function() {
        this.Ys && (this.document.removeEventListener("visibilitychange", this.Ys), this.Ys = null);
    }, 
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    t.prototype.oi = function() {
        var t, e = this;
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.Js = function() {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            e.Ii(), p() && navigator.appVersion.match(/Version\/1[45]/) && 
            // On Safari 14 and 15, we do not run any cleanup actions as it might
            // trigger a bug that prevents Safari from re-opening IndexedDB during
            // the next page load.
            // See https://bugs.webkit.org/show_bug.cgi?id=226547
            e.js.enterRestrictedMode(/* purgeExistingTasks= */ !0), e.js.enqueueAndForget((function() {
                return e.shutdown();
            }));
        }, this.window.addEventListener("pagehide", this.Js));
    }, t.prototype.Ei = function() {
        this.Js && (this.window.removeEventListener("pagehide", this.Js), this.Js = null);
    }, 
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t.prototype.pi = function(t) {
        var e;
        try {
            var n = null !== (null === (e = this.si) || void 0 === e ? void 0 : e.getItem(this.yi(t)));
            return U("IndexedDbPersistence", "Client '" + t + "' " + (n ? "is" : "is not") + " zombied in LocalStorage"), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return B("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }, 
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t.prototype.Ii = function() {
        if (this.si) try {
            this.si.setItem(this.yi(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            B("Failed to set zombie client id.", t);
        }
    }, 
    /** Removes the zombied client entry if it exists. */ t.prototype.Ai = function() {
        if (this.si) try {
            this.si.removeItem(this.yi(this.clientId));
        } catch (t) {
            // Ignore
        }
    }, t.prototype.yi = function(t) {
        return "firestore_zombie_" + this.persistenceKey + "_" + t;
    }, t;
}();

/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{synchronizeTabs:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
 * longer optional.
 */
/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */
function pu(t) {
    return Oi(t, "owner");
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function vu(t) {
    return Oi(t, "clientMetadata");
}

/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */ function yu(t, e) {
    // Use two different prefix formats:
    //   * firestore / persistenceKey / projectID . databaseID / ...
    //   * firestore / persistenceKey / projectID / ...
    // projectIDs are DNS-compatible names and cannot contain dots
    // so there's no danger of collisions.
    var n = t.projectId;
    return t.isDefaultDatabase || (n += "." + t.database), "firestore/" + e + "/" + n + "/"
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */;
}

var mu = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.Pi = n, this.vi = r;
    }
    return t.Vi = function(e, n) {
        for (var r = yr(), i = yr(), o = 0, u = n.docChanges; o < u.length; o++) {
            var s = u[o];
            switch (s.type) {
              case 0 /* Added */ :
                r = r.add(s.doc.key);
                break;

              case 1 /* Removed */ :
                i = i.add(s.doc.key);
                // do nothing
                        }
        }
        return new t(e, n.fromCache, r, i);
    }, t;
}(), gu = /** @class */ function() {
    function t() {
        this.Si = !1;
    }
    /** Sets the document view to query against. */    return t.prototype.initialize = function(t, e) {
        this.Di = t, this.indexManager = e, this.Si = !0;
    }, 
    /** Returns all local documents matching the specified query. */ t.prototype.getDocumentsMatchingQuery = function(t, e, n, r) {
        var i = this;
        return this.Ci(t, e).next((function(o) {
            return o || i.xi(t, e, r, n);
        })).next((function(n) {
            return n || i.Ni(t, e);
        }));
    }, 
    /**
     * Performs an indexed query that evaluates the query based on a collection's
     * persisted index values. Returns `null` if an index is not available.
     */
    t.prototype.Ci = function(t, e) {
        return kt.resolve(null);
    }, 
    /**
     * Performs a query based on the target's persisted query mapping. Returns
     * `null` if the mapping is not available or cannot be used.
     */
    t.prototype.xi = function(t, e, n, r) {
        var i = this;
        return function(t) {
            return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField());
        }(e) || r.isEqual(ft.min()) ? this.Ni(t, e) : this.Di.getDocuments(t, n).next((function(o) {
            var u = i.ki(e, o);
            return i.Oi(e, u, n, r) ? i.Ni(t, e) : (P() <= h.DEBUG && U("QueryEngine", "Re-using previous result from %s to execute query: %s", r.toString(), mn(e)), 
            i.Mi(t, u, e, Tt(r, -1)));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }, 
    /** Applies the query filter and sorting to the provided documents.  */ t.prototype.ki = function(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        var n = new Yt(bn(t));
        return e.forEach((function(e, r) {
            gn(t, r) && (n = n.add(r));
        })), n;
    }, 
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param query - The query.
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */
    t.prototype.Oi = function(t, e, n, r) {
        if (null === t.limit) 
        // Queries without limits do not need to be refilled.
        return !1;
        if (n.size !== e.size) 
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                var i = "F" /* First */ === t.limitType ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
    }, t.prototype.Ni = function(t, e) {
        return P() <= h.DEBUG && U("QueryEngine", "Using full collection scan to execute query:", mn(e)), 
        this.Di.getDocumentsMatchingQuery(t, e, Dt.min());
    }, 
    /**
     * Combines the results from an indexed execution with the remaining documents
     * that have not yet been indexed.
     */
    t.prototype.Mi = function(t, e, n, r) {
        // Retrieve all results for documents that were updated since the offset.
        return this.Di.getDocumentsMatchingQuery(t, n, r).next((function(t) {
            // Merge with existing results
            return e.forEach((function(e) {
                t = t.insert(e.key, e);
            })), t;
        }));
    }, t;
}(), wu = /** @class */ function() {
    function t(
    /** Manages our in-memory or durable persistence. */
    t, e, n, r) {
        this.persistence = t, this.Fi = e, this.wt = r, 
        /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
        this.$i = new Qt(at), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.Bi = new or((function(t) {
            return qe(t);
        }), Ue), 
        /**
             * A per collection group index of the last read time processed by
             * `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.Li = new Map, this.Ui = t.getRemoteDocumentCache(), this.Vs = t.getTargetCache(), 
        this.Ds = t.getBundleCache(), this.qi(n);
    }
    return t.prototype.qi = function(t) {
        // TODO(indexing): Add spec tests that test these components change after a
        // user change
        this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t), this.indexManager = this.persistence.getIndexManager(t), 
        this.mutationQueue = this.persistence.getMutationQueue(t, this.indexManager), this.localDocuments = new $o(this.Ui, this.mutationQueue, this.documentOverlayCache, this.indexManager), 
        this.Ui.setIndexManager(this.indexManager), this.Fi.initialize(this.localDocuments, this.indexManager);
    }, t.prototype.collectGarbage = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.collect(n, e.$i);
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The Firestore query engine.
 *
 * Firestore queries can be executed in three modes. The Query Engine determines
 * what mode to use based on what data is persisted. The mode only determines
 * the runtime complexity of the query - the result set is equivalent across all
 * implementations.
 *
 * The Query engine will use indexed-based execution if a user has configured
 * any index that can be used to execute query (via `setIndexConfiguration()`).
 * Otherwise, the engine will try to optimize the query by re-using a previously
 * persisted query result. If that is not possible, the query will be executed
 * via a full collection scan.
 *
 * Index-based execution is the default when available. The query engine
 * supports partial indexed execution and merges the result from the index
 * lookup with documents that have not yet been indexed. The index evaluation
 * matches the backend's format and as such, the SDK can use indexing for all
 * queries that the backend supports.
 *
 * If no index exists, the query engine tries to take advantage of the target
 * document mapping in the TargetCache. These mappings exists for all queries
 * that have been synced with the backend at least once and allow the query
 * engine to only read documents that previously matched a query plus any
 * documents that were edited after the query was last listened to.
 *
 * There are some cases when this optimization is not guaranteed to produce
 * the same results as full collection scans. In these cases, query
 * processing falls back to full scans. These cases are:
 *
 * - Limit queries where a document that matched the query previously no longer
 *   matches the query.
 *
 * - Limit queries where a document edit may cause the document to sort below
 *   another document that is in the local cache.
 *
 * - Queries that have never been CURRENT or free of limbo documents.
 */ function bu(
/** Manages our in-memory or durable persistence. */
t, e, n, r) {
    return new wu(t, e, n, r);
}

/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
function Iu(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , (e = W(t)).persistence.runTransaction("Handle user change", "readonly", (function(t) {
                    // Swap out the mutation queue, grabbing the pending mutation batches
                    // before and after.
                    var n;
                    return e.mutationQueue.getAllMutationBatches(t).next((function(i) {
                        return n = i, e.qi(r), e.mutationQueue.getAllMutationBatches(t);
                    })).next((function(r) {
                        for (var i = [], o = [], u = yr(), s = 0, a = n
                        // Union the old/new changed keys.
                        ; s < a.length; s++) {
                            var c = a[s];
                            i.push(c.batchId);
                            for (var l = 0, h = c.mutations; l < h.length; l++) {
                                var f = h[l];
                                u = u.add(f.key);
                            }
                        }
                        for (var d = 0, p = r; d < p.length; d++) {
                            var v = p[d];
                            o.push(v.batchId);
                            for (var y = 0, m = v.mutations; y < m.length; y++) {
                                var g = m[y];
                                u = u.add(g.key);
                            }
                        }
                        // Return the set of all (potentially) changed documents and the list
                        // of mutation batch IDs that were affected by change.
                                                return e.localDocuments.getDocuments(t, u).next((function(t) {
                            return {
                                Ki: t,
                                removedBatchIds: i,
                                addedBatchIds: o
                            };
                        }));
                    }));
                })) ];

              case 1:
                return [ 2 /*return*/ , n.sent() ];
            }
        }));
    }));
}

/* Accepts locally generated Mutations and commit them to storage. */
/**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */ function Eu(t, e) {
    var n = W(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(t) {
        var r = e.batch.keys(), i = n.Ui.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, r) {
            var i = n.batch, o = i.keys(), u = kt.resolve();
            return o.forEach((function(t) {
                u = u.next((function() {
                    return r.getEntry(e, t);
                })).next((function(e) {
                    var o = n.docVersions.get(t);
                    z(null !== o), e.version.compareTo(o) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && (
                    // We use the commitVersion as the readTime rather than the
                    // document's updateTime since the updateTime is not advanced
                    // for updates that do not modify the underlying document.
                    e.setReadTime(n.commitVersion), r.addEntry(e)));
                }));
            })), u.next((function() {
                return t.mutationQueue.removeMutationBatch(e, i);
            }));
        }(n, t, e, i).next((function() {
            return i.apply(t);
        })).next((function() {
            return n.mutationQueue.performConsistencyCheck(t);
        })).next((function() {
            return n.documentOverlayCache.removeOverlaysForBatchId(t, r, e.batch.batchId);
        })).next((function() {
            return n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, function(t) {
                for (var e = yr(), n = 0; n < t.mutationResults.length; ++n) t.mutationResults[n].transformResults.length > 0 && (e = e.add(t.batch.mutations[n].key));
                return e;
            }(e));
        })).next((function() {
            return n.localDocuments.getDocuments(t, r);
        }));
    }));
}

/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */ function Tu(t) {
    var e = W(t);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(t) {
        return e.Vs.getLastRemoteSnapshotVersion(t);
    }));
}

/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function Su(t, e) {
    var n = W(t), r = e.snapshotVersion, i = n.$i;
    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(t) {
        var o = n.Ui.newChangeBuffer({
            trackRemovals: !0
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                i = n.$i;
        var u = [];
        e.targetChanges.forEach((function(o, s) {
            var a = i.get(s);
            if (a) {
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                u.push(n.Vs.removeMatchingKeys(t, o.removedDocuments, s).next((function() {
                    return n.Vs.addMatchingKeys(t, o.addedDocuments, s);
                })));
                var c = a.withSequenceNumber(t.currentSequenceNumber);
                e.targetMismatches.has(s) ? c = c.withResumeToken(te.EMPTY_BYTE_STRING, ft.min()).withLastLimboFreeSnapshotVersion(ft.min()) : o.resumeToken.approximateByteSize() > 0 && (c = c.withResumeToken(o.resumeToken, r)), 
                i = i.insert(s, c), 
                // Update the target data if there are target changes (or if
                // sufficient time has passed since the last update).
                /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
                function(t, e, n) {
                    // Always persist target data if we don't already have a resume token.
                    return 0 === t.resumeToken.approximateByteSize() || (
                    // Don't allow resume token changes to be buffered indefinitely. This
                    // allows us to be reasonably up-to-date after a crash and avoids needing
                    // to loop over all active queries on shutdown. Especially in the browser
                    // we may not get time to do anything interesting while the current tab is
                    // closing.
                    e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8 || n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0);
                }(a, c, o) && u.push(n.Vs.updateTargetData(t, c));
            }
        }));
        var s = sr(), a = yr();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
                if (e.documentUpdates.forEach((function(r) {
            e.resolvedLimboDocuments.has(r) && u.push(n.persistence.referenceDelegate.updateLimboDocument(t, r));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all
        // the remote documents in advance in a single call.
        u.push(Du(t, o, e.documentUpdates).next((function(t) {
            s = t.Gi, a = t.Qi;
        }))), !r.isEqual(ft.min())) {
            var c = n.Vs.getLastRemoteSnapshotVersion(t).next((function(e) {
                return n.Vs.setTargetsMetadata(t, t.currentSequenceNumber, r);
            }));
            u.push(c);
        }
        return kt.waitFor(u).next((function() {
            return o.apply(t);
        })).next((function() {
            return n.localDocuments.getLocalViewOfDocuments(t, s, a);
        })).next((function() {
            return s;
        }));
    })).then((function(t) {
        return n.$i = i, t;
    }));
}

/**
 * Populates document change buffer with documents from backend or a bundle.
 * Returns the document changes resulting from applying those documents, and
 * also a set of documents whose existence state are changed as a result.
 *
 * @param txn - Transaction to use to read existing documents from storage.
 * @param documentBuffer - Document buffer to collect the resulted changes to be
 *        applied to storage.
 * @param documents - Documents to be applied.
 */ function Du(t, e, n) {
    var r = yr(), i = yr();
    return n.forEach((function(t) {
        return r = r.add(t);
    })), e.getEntries(t, r).next((function(t) {
        var r = sr();
        return n.forEach((function(n, o) {
            var u = t.get(n);
            // Check if see if there is a existence state change for this document.
                        o.isFoundDocument() !== u.isFoundDocument() && (i = i.add(n)), 
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
            o.isNoDocument() && o.version.isEqual(ft.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, o.readTime), r = r.insert(n, o)) : !u.isValidDocument() || o.version.compareTo(u.version) > 0 || 0 === o.version.compareTo(u.version) && u.hasPendingWrites ? (e.addEntry(o), 
            r = r.insert(n, o)) : U("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", u.version, " Watch version:", o.version);
        })), {
            Gi: r,
            Qi: i
        };
    }))
    /**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */;
}

function _u(t, e) {
    var n = W(t);
    return n.persistence.runTransaction("Get next mutation batch", "readonly", (function(t) {
        return void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t, e);
    }));
}

/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */ function xu(t, e) {
    var n = W(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (function(t) {
        var r;
        return n.Vs.getTargetData(t, e).next((function(i) {
            return i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            r = i, kt.resolve(r)) : n.Vs.allocateTargetId(t).next((function(i) {
                return r = new Fi(e, i, 0 /* Listen */ , t.currentSequenceNumber), n.Vs.addTargetData(t, r).next((function() {
                    return r;
                }));
            }));
        }));
    })).then((function(t) {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        var r = n.$i.get(t.targetId);
        return (null === r || t.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.$i = n.$i.insert(t.targetId, t), 
        n.Bi.set(e, t.targetId)), t;
    }));
}

/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
// Visible for testing.
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
// PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
function Nu(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, u, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = W(t), o = e.$i.get(r), u = i ? "readwrite" : "readwrite-primary", n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 5 ]), i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , e.persistence.runTransaction("Release target", u, (function(t) {
                    return e.persistence.referenceDelegate.removeTarget(t, o);
                })) ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return [ 3 /*break*/ , 5 ];

              case 4:
                if (!Rt(s = n.sent())) throw s;
                // All `releaseTarget` does is record the final metadata state for the
                // target, but we've been recording this periodically during target
                // activity. If we lose this write this could cause a very slight
                // difference in the order of target deletion during GC, but we
                // don't define exact LRU semantics so this is acceptable.
                                return U("LocalStore", "Failed to update sequence numbers for target " + r + ": " + s), 
                [ 3 /*break*/ , 5 ];

              case 5:
                return e.$i = e.$i.remove(r), e.Bi.delete(o.target), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */ function Au(t, e, n) {
    var r = W(t), i = ft.min(), o = yr();
    return r.persistence.runTransaction("Execute query", "readonly", (function(t) {
        return function(t, e, n) {
            var r = W(t), i = r.Bi.get(n);
            return void 0 !== i ? kt.resolve(r.$i.get(i)) : r.Vs.getTargetData(e, n);
        }(r, t, dn(e)).next((function(e) {
            if (e) return i = e.lastLimboFreeSnapshotVersion, r.Vs.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
                o = t;
            }));
        })).next((function() {
            return r.Fi.getDocumentsMatchingQuery(t, e, n ? i : ft.min(), n ? o : yr());
        })).next((function(t) {
            return Vu(r, wn(e), t), {
                documents: t,
                ji: o
            };
        }));
    }));
}

// PORTING NOTE: Multi-Tab only.
function ku(t, e) {
    var n = W(t), r = W(n.Vs), i = n.$i.get(e);
    return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", (function(t) {
        return r.te(t, e).next((function(t) {
            return t ? t.target : null;
        }));
    }));
}

/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
// PORTING NOTE: Multi-Tab only.
function Cu(t, e) {
    var n = W(t), r = n.Li.get(e) || ft.min();
    // Get the current maximum read time for the collection. This should always
    // exist, but to reduce the chance for regressions we default to
    // SnapshotVersion.Min()
    // TODO(indexing): Consider removing the default value.
        return n.persistence.runTransaction("Get new document changes", "readonly", (function(t) {
        return n.Ui.getAllFromCollectionGroup(t, e, Tt(r, -1), 
        /* limit= */ Number.MAX_SAFE_INTEGER);
    })).then((function(t) {
        return Vu(n, e, t), t;
    }));
}

/** Sets the collection group's maximum read time from the given documents. */
// PORTING NOTE: Multi-Tab only.
function Vu(t, e, n) {
    var r = ft.min();
    n.forEach((function(t, e) {
        e.readTime.compareTo(r) > 0 && (r = e.readTime);
    })), t.Li.set(e, r);
}

/**
 * Creates a new target using the given bundle name, which will be used to
 * hold the keys of all documents from the bundle in query-document mappings.
 * This ensures that the loaded documents do not get garbage collected
 * right away.
 */
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function Ou(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, u, s, a, c, l, h, f, d, p;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                for (e = W(t), u = yr(), s = sr(), a = 0, c = i; a < c.length; a++) l = c[a], h = r.Wi(l.metadata.name), 
                l.document && (u = u.add(h)), (f = r.zi(l)).setReadTime(r.Hi(l.metadata.readTime)), 
                s = s.insert(h, f);
                return d = e.Ui.newChangeBuffer({
                    trackRemovals: !0
                }), [ 4 /*yield*/ , xu(e, function(t) {
                    // It is OK that the path used for the query is not valid, because this will
                    // not be read and queried.
                    return dn(an(pt.fromString("__bundle__/docs/" + t)));
                }(o)) ];

              case 1:
                // Allocates a target to hold all document keys from the bundle, such that
                // they will not get garbage collected right away.
                return p = n.sent(), [ 2 /*return*/ , e.persistence.runTransaction("Apply bundle documents", "readwrite", (function(t) {
                    return Du(t, d, s).next((function(e) {
                        return d.apply(t), e;
                    })).next((function(n) {
                        return e.Vs.removeMatchingKeysForTargetId(t, p.targetId).next((function() {
                            return e.Vs.addMatchingKeys(t, u, p.targetId);
                        })).next((function() {
                            return e.localDocuments.getLocalViewOfDocuments(t, n.Gi, n.Qi);
                        })).next((function() {
                            return n.Gi;
                        }));
                    }));
                })) ];
            }
        }));
    }));
}

/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
/**
 * Saves the given `NamedQuery` to local persistence.
 */ function Mu(t, r, i) {
    return void 0 === i && (i = yr()), e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , xu(t, dn(Qi(r.bundledQuery))) ];

              case 1:
                return e = n.sent(), [ 2 /*return*/ , (o = W(t)).persistence.runTransaction("Save named query", "readwrite", (function(t) {
                    var n = Mr(r.readTime);
                    // Simply save the query itself if it is older than what the SDK already
                    // has.
                                        if (e.snapshotVersion.compareTo(n) >= 0) return o.Ds.saveNamedQuery(t, r);
                    // Update existing target data because the query from the bundle is newer.
                                        var u = e.withResumeToken(te.EMPTY_BYTE_STRING, n);
                    return o.$i = o.$i.insert(u.targetId, u), o.Vs.updateTargetData(t, u).next((function() {
                        return o.Vs.removeMatchingKeysForTargetId(t, e.targetId);
                    })).next((function() {
                        return o.Vs.addMatchingKeys(t, i, e.targetId);
                    })).next((function() {
                        return o.Ds.saveNamedQuery(t, r);
                    }));
                })) ];
            }
        }));
    }));
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The format of the LocalStorage key that stores the client state is:
//     firestore_clients_<persistence_prefix>_<instance_key>
/** Assembles the key for a client state in WebStorage */ function Ru(t, e) {
    return "firestore_clients_" + t + "_" + e;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */ function Lu(t, e, n) {
    var r = "firestore_mutations_" + t + "_" + n;
    return e.isAuthenticated() && (r += "_" + e.uid), r;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */ function Fu(t, e) {
    return "firestore_targets_" + t + "_" + e;
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
var Pu = /** @class */ function() {
    function t(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, this.error = r
        /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Ji = function(e, n, r) {
        var i, o = JSON.parse(r), u = "object" == typeof o && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(o.state) && (void 0 === o.error || "object" == typeof o.error);
        return u && o.error && ((u = "string" == typeof o.error.message && "string" == typeof o.error.code) && (i = new Y(o.error.code, o.error.message))), 
        u ? new t(e, n, o.state, i) : (B("SharedClientState", "Failed to parse mutation state for ID '" + n + "': " + r), 
        null);
    }, t.prototype.Yi = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), qu = /** @class */ function() {
    function t(t, e, n) {
        this.targetId = t, this.state = e, this.error = n
        /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Ji = function(e, n) {
        var r, i = JSON.parse(n), o = "object" == typeof i && -1 !== [ "not-current", "current", "rejected" ].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error);
        return o && i.error && ((o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (r = new Y(i.error.code, i.error.message))), 
        o ? new t(e, i.state, r) : (B("SharedClientState", "Failed to parse target state for ID '" + e + "': " + n), 
        null);
    }, t.prototype.Yi = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), Uu = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.activeTargetIds = e
        /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Ji = function(e, n) {
        for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = gr(), u = 0; i && u < r.activeTargetIds.length; ++u) i = fe(r.activeTargetIds[u]), 
        o = o.add(r.activeTargetIds[u]);
        return i ? new t(e, o) : (B("SharedClientState", "Failed to parse client data for instance '" + e + "': " + n), 
        null);
    }, t;
}(), Bu = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.onlineState = e
        /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Ji = function(e) {
        var n = JSON.parse(e);
        return "object" == typeof n && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t(n.clientId, n.onlineState) : (B("SharedClientState", "Failed to parse online state: " + e), 
        null);
    }, t;
}(), Ku = /** @class */ function() {
    function t() {
        this.activeTargetIds = gr();
    }
    return t.prototype.Xi = function(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }, t.prototype.Zi = function(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }, 
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t.prototype.Yi = function() {
        var t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }, t;
}(), Gu = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.window = t, this.js = e, this.persistenceKey = n, this.tr = r, this.syncEngine = null, 
        this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.er = this.nr.bind(this), 
        this.sr = new Qt(at), this.started = !1, 
        /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
        this.ir = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.rr = Ru(this.persistenceKey, this.tr), 
        this.ur = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return "firestore_sequence_number_" + t;
        }(this.persistenceKey), this.sr = this.sr.insert(this.tr, new Ku), this.cr = new RegExp("^firestore_clients_" + o + "_([^_]*)$"), 
        this.ar = new RegExp("^firestore_mutations_" + o + "_(\\d+)(?:_(.*))?$"), this.hr = new RegExp("^firestore_targets_" + o + "_(\\d+)$"), 
        this.lr = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return "firestore_online_state_" + t;
        }(this.persistenceKey), this.dr = function(t) {
            return "firestore_bundle_loaded_v2_" + t;
        }(this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener("storage", this.er);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    return t.V = function(t) {
        return !(!t || !t.localStorage);
    }, t.prototype.start = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o, u, s, a, c, l, h, f = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.syncEngine.Ri() ];

                  case 1:
                    for (t = n.sent(), e = 0, r = t; e < r.length; e++) (i = r[e]) !== this.tr && (o = this.getItem(Ru(this.persistenceKey, i))) && (u = Uu.Ji(i, o)) && (this.sr = this.sr.insert(u.clientId, u));
                    for (this._r(), (s = this.storage.getItem(this.lr)) && (a = this.wr(s)) && this.mr(a), 
                    c = 0, l = this.ir; c < l.length; c++) h = l[c], this.nr(h);
                    return this.ir = [], 
                    // Register a window unload hook to remove the client metadata entry from
                    // WebStorage even if `shutdown()` was not called.
                    this.window.addEventListener("pagehide", (function() {
                        return f.shutdown();
                    })), this.started = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.writeSequenceNumber = function(t) {
        this.setItem(this.ur, JSON.stringify(t));
    }, t.prototype.getAllActiveQueryTargets = function() {
        return this.gr(this.sr);
    }, t.prototype.isActiveQueryTarget = function(t) {
        var e = !1;
        return this.sr.forEach((function(n, r) {
            r.activeTargetIds.has(t) && (e = !0);
        })), e;
    }, t.prototype.addPendingMutation = function(t) {
        this.yr(t, "pending");
    }, t.prototype.updateMutationState = function(t, e, n) {
        this.yr(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.pr(t);
    }, t.prototype.addLocalQueryTarget = function(t) {
        var e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.isActiveQueryTarget(t)) {
            var n = this.storage.getItem(Fu(this.persistenceKey, t));
            if (n) {
                var r = qu.Ji(t, n);
                r && (e = r.state);
            }
        }
        return this.Ir.Xi(t), this._r(), e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.Ir.Zi(t), this._r();
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.Ir.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        this.removeItem(Fu(this.persistenceKey, t));
    }, t.prototype.updateQueryState = function(t, e, n) {
        this.Tr(t, e, n);
    }, t.prototype.handleUserChange = function(t, e, n) {
        var r = this;
        e.forEach((function(t) {
            r.pr(t);
        })), this.currentUser = t, n.forEach((function(t) {
            r.addPendingMutation(t);
        }));
    }, t.prototype.setOnlineState = function(t) {
        this.Er(t);
    }, t.prototype.notifyBundleLoaded = function(t) {
        this.Ar(t);
    }, t.prototype.shutdown = function() {
        this.started && (this.window.removeEventListener("storage", this.er), this.removeItem(this.rr), 
        this.started = !1);
    }, t.prototype.getItem = function(t) {
        var e = this.storage.getItem(t);
        return U("SharedClientState", "READ", t, e), e;
    }, t.prototype.setItem = function(t, e) {
        U("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }, t.prototype.removeItem = function(t) {
        U("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }, t.prototype.nr = function(t) {
        var r = this, i = t;
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
                if (i.storageArea === this.storage) {
            if (U("SharedClientState", "EVENT", i.key, i.newValue), i.key === this.rr) return void B("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.js.enqueueRetryable((function() {
                return e(r, void 0, void 0, (function() {
                    var t, e, r, o, u, s, a, c = this;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return this.started ? null === i.key ? [ 3 /*break*/ , 7 ] : this.cr.test(i.key) ? null == i.newValue ? (t = this.Rr(i.key), 
                            [ 2 /*return*/ , this.br(t, null) ]) : (e = this.Pr(i.key, i.newValue)) ? [ 2 /*return*/ , this.br(e.clientId, e) ] : [ 3 /*break*/ , 7 ] : [ 3 /*break*/ , 1 ] : [ 3 /*break*/ , 8 ];

                          case 1:
                            return this.ar.test(i.key) ? null !== i.newValue && (r = this.vr(i.key, i.newValue)) ? [ 2 /*return*/ , this.Vr(r) ] : [ 3 /*break*/ , 7 ] : [ 3 /*break*/ , 2 ];

                          case 2:
                            return this.hr.test(i.key) ? null !== i.newValue && (o = this.Sr(i.key, i.newValue)) ? [ 2 /*return*/ , this.Dr(o) ] : [ 3 /*break*/ , 7 ] : [ 3 /*break*/ , 3 ];

                          case 3:
                            return i.key !== this.lr ? [ 3 /*break*/ , 4 ] : null !== i.newValue && (u = this.wr(i.newValue)) ? [ 2 /*return*/ , this.mr(u) ] : [ 3 /*break*/ , 7 ];

                          case 4:
                            return i.key !== this.ur ? [ 3 /*break*/ , 5 ] : (s = function(t) {
                                var e = Kt.ot;
                                if (null != t) try {
                                    var n = JSON.parse(t);
                                    z("number" == typeof n), e = n;
                                } catch (t) {
                                    B("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }(i.newValue), s !== Kt.ot && this.sequenceNumberHandler(s), [ 3 /*break*/ , 7 ]);

                          case 5:
                            return i.key !== this.dr ? [ 3 /*break*/ , 7 ] : (a = this.Cr(i.newValue), [ 4 /*yield*/ , Promise.all(a.map((function(t) {
                                return c.syncEngine.Nr(t);
                            }))) ]);

                          case 6:
                            n.sent(), n.label = 7;

                          case 7:
                            return [ 3 /*break*/ , 9 ];

                          case 8:
                            this.ir.push(i), n.label = 9;

                          case 9:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        }
    }, Object.defineProperty(t.prototype, "Ir", {
        get: function() {
            return this.sr.get(this.tr);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype._r = function() {
        this.setItem(this.rr, this.Ir.Yi());
    }, t.prototype.yr = function(t, e, n) {
        var r = new Pu(this.currentUser, t, e, n), i = Lu(this.persistenceKey, this.currentUser, t);
        this.setItem(i, r.Yi());
    }, t.prototype.pr = function(t) {
        var e = Lu(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }, t.prototype.Er = function(t) {
        var e = {
            clientId: this.tr,
            onlineState: t
        };
        this.storage.setItem(this.lr, JSON.stringify(e));
    }, t.prototype.Tr = function(t, e, n) {
        var r = Fu(this.persistenceKey, t), i = new qu(t, e, n);
        this.setItem(r, i.Yi());
    }, t.prototype.Ar = function(t) {
        var e = JSON.stringify(Array.from(t));
        this.setItem(this.dr, e);
    }, 
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    t.prototype.Rr = function(t) {
        var e = this.cr.exec(t);
        return e ? e[1] : null;
    }, 
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    t.prototype.Pr = function(t, e) {
        var n = this.Rr(t);
        return Uu.Ji(n, e);
    }, 
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.vr = function(t, e) {
        var n = this.ar.exec(t), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return Pu.Ji(new R(i), r, e);
    }, 
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.Sr = function(t, e) {
        var n = this.hr.exec(t), r = Number(n[1]);
        return qu.Ji(r, e);
    }, 
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.wr = function(t) {
        return Bu.Ji(t);
    }, t.prototype.Cr = function(t) {
        return JSON.parse(t);
    }, t.prototype.Vr = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                return t.user.uid === this.currentUser.uid ? [ 2 /*return*/ , this.syncEngine.kr(t.batchId, t.state, t.error) ] : (U("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid), 
                [ 2 /*return*/ ]);
            }));
        }));
    }, t.prototype.Dr = function(t) {
        return this.syncEngine.Or(t.targetId, t.state, t.error);
    }, t.prototype.br = function(t, e) {
        var n = this, r = e ? this.sr.insert(t, e) : this.sr.remove(t), i = this.gr(this.sr), o = this.gr(r), u = [], s = [];
        return o.forEach((function(t) {
            i.has(t) || u.push(t);
        })), i.forEach((function(t) {
            o.has(t) || s.push(t);
        })), this.syncEngine.Mr(u, s).then((function() {
            n.sr = r;
        }));
    }, t.prototype.mr = function(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.sr.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }, t.prototype.gr = function(t) {
        var e = gr();
        return t.forEach((function(t, n) {
            e = e.unionWith(n.activeTargetIds);
        })), e;
    }, t;
}(), ju = /** @class */ function() {
    function t() {
        this.Fr = new Ku, this.$r = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
    }
    return t.prototype.addPendingMutation = function(t) {
        // No op.
    }, t.prototype.updateMutationState = function(t, e, n) {
        // No op.
    }, t.prototype.addLocalQueryTarget = function(t) {
        return this.Fr.Xi(t), this.$r[t] || "not-current";
    }, t.prototype.updateQueryState = function(t, e, n) {
        this.$r[t] = e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.Fr.Zi(t);
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.Fr.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        delete this.$r[t];
    }, t.prototype.getAllActiveQueryTargets = function() {
        return this.Fr.activeTargetIds;
    }, t.prototype.isActiveQueryTarget = function(t) {
        return this.Fr.activeTargetIds.has(t);
    }, t.prototype.start = function() {
        return this.Fr = new Ku, Promise.resolve();
    }, t.prototype.handleUserChange = function(t, e, n) {
        // No op.
    }, t.prototype.setOnlineState = function(t) {
        // No op.
    }, t.prototype.shutdown = function() {}, t.prototype.writeSequenceNumber = function(t) {}, 
    t.prototype.notifyBundleLoaded = function(t) {
        // No op.
    }, t;
}(), zu = /** @class */ function() {
    function t() {}
    return t.prototype.Br = function(t) {
        // No-op.
    }, t.prototype.shutdown = function() {
        // No-op.
    }, t;
}(), Qu = /** @class */ function() {
    function t() {
        var t = this;
        this.Lr = function() {
            return t.Ur();
        }, this.qr = function() {
            return t.Kr();
        }, this.Gr = [], this.Qr();
    }
    return t.prototype.Br = function(t) {
        this.Gr.push(t);
    }, t.prototype.shutdown = function() {
        window.removeEventListener("online", this.Lr), window.removeEventListener("offline", this.qr);
    }, t.prototype.Qr = function() {
        window.addEventListener("online", this.Lr), window.addEventListener("offline", this.qr);
    }, t.prototype.Ur = function() {
        U("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.Gr; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.Kr = function() {
        U("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.Gr; t < e.length; t++) {
            (0, e[t])(1 /* UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t.V = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), Wu = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery"
}, Hu = /** @class */ function() {
    function t(t) {
        this.jr = t.jr, this.Wr = t.Wr;
    }
    return t.prototype.zr = function(t) {
        this.Hr = t;
    }, t.prototype.Jr = function(t) {
        this.Yr = t;
    }, t.prototype.onMessage = function(t) {
        this.Xr = t;
    }, t.prototype.close = function() {
        this.Wr();
    }, t.prototype.send = function(t) {
        this.jr(t);
    }, t.prototype.Zr = function() {
        this.Hr();
    }, t.prototype.eo = function(t) {
        this.Yr(t);
    }, t.prototype.no = function(t) {
        this.Xr(t);
    }, t;
}(), Yu = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, t) || this).forceLongPolling = t.forceLongPolling, n.autoDetectLongPolling = t.autoDetectLongPolling, 
        n.useFetchStreams = t.useFetchStreams, n;
    }
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    return t(n, e), n.prototype.co = function(t, e, n, r) {
        return new Promise((function(i, o) {
            var u = new D;
            u.listenOnce(_.COMPLETE, (function() {
                try {
                    switch (u.getLastErrorCode()) {
                      case x.NO_ERROR:
                        var e = u.getResponseJson();
                        U("Connection", "XHR received:", JSON.stringify(e)), i(e);
                        break;

                      case x.TIMEOUT:
                        U("Connection", 'RPC "' + t + '" timed out'), o(new Y(H.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case x.HTTP_ERROR:
                        var n = u.getStatus();
                        if (U("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", u.getResponseText()), 
                        n > 0) {
                            var r = u.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var s = function(t) {
                                    var e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(H).indexOf(e) >= 0 ? e : H.UNKNOWN;
                                }(r.status);
                                o(new Y(s, r.message));
                            } else o(new Y(H.UNKNOWN, "Server responded with status " + u.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        o(new Y(H.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        j();
                    }
                } finally {
                    U("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            var s = JSON.stringify(r);
            u.send(e, "POST", s, n, 15);
        }));
    }, n.prototype.ho = function(t, e, n) {
        var r = [ this.so, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], i = N(), o = A(), u = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling,
            detectBufferingProxy: this.autoDetectLongPolling
        };
        this.useFetchStreams && (u.xmlHttpFactory = new k({})), this.uo(u.initMessageHeaders, e, n), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        v() || y() || m() || g() || w() || b() || (u.httpHeadersOverwriteParam = "$httpHeaders");
        var s = r.join("");
        U("Connection", "Creating WebChannel: " + s, u);
        var a = i.createWebChannel(s, u), c = !1, l = !1, h = new Hu({
            jr: function(t) {
                l ? U("Connection", "Not sending because WebChannel is closed:", t) : (c || (U("Connection", "Opening WebChannel transport."), 
                a.open(), c = !0), U("Connection", "WebChannel sending:", t), a.send(t));
            },
            Wr: function() {
                return a.close();
            }
        }), f = function(t, e, n) {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            t.listen(e, (function(t) {
                try {
                    n(t);
                } catch (t) {
                    setTimeout((function() {
                        throw t;
                    }), 0);
                }
            }));
        };
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
        return f(a, C.EventType.OPEN, (function() {
            l || U("Connection", "WebChannel transport opened.");
        })), f(a, C.EventType.CLOSE, (function() {
            l || (l = !0, U("Connection", "WebChannel transport closed"), h.eo());
        })), f(a, C.EventType.ERROR, (function(t) {
            l || (l = !0, K("Connection", "WebChannel transport errored:", t), h.eo(new Y(H.UNAVAILABLE, "The operation could not be completed")));
        })), f(a, C.EventType.MESSAGE, (function(t) {
            var e;
            if (!l) {
                var n = t.data[0];
                z(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    U("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    var o = i.status, u = 
                    /**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */
                    function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var e = $n[t];
                        if (void 0 !== e) return ir(e);
                    }(o), s = i.message;
                    void 0 === u && (u = H.INTERNAL, s = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    l = !0, h.eo(new Y(u, s)), a.close();
                } else U("Connection", "WebChannel received:", n), h.no(n);
            }
        })), f(o, V.STAT_EVENT, (function(t) {
            t.stat === O.PROXY ? U("Connection", "Detected buffering proxy") : t.stat === O.NOPROXY && U("Connection", "Detected no buffering proxy");
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            h.Zr();
        }), 0), h;
    }, n;
}(/** @class */ function() {
    function t(t) {
        this.databaseInfo = t, this.databaseId = t.databaseId;
        var e = t.ssl ? "https" : "http";
        this.so = e + "://" + t.host, this.io = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
    }
    return t.prototype.ro = function(t, e, n, r, i) {
        var o = this.oo(t, e);
        U("RestConnection", "Sending: ", o, n);
        var u = {};
        return this.uo(u, r, i), this.co(t, o, u, n).then((function(t) {
            return U("RestConnection", "Received: ", t), t;
        }), (function(e) {
            throw K("RestConnection", t + " failed with error: ", e, "url: ", o, "request:", n), 
            e;
        }));
    }, t.prototype.ao = function(t, e, n, r, i) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.ro(t, e, n, r, i);
    }, 
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    t.prototype.uo = function(t, e, n) {
        t["X-Goog-Api-Client"] = "gl-js/ fire/" + L, 
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
        e && e.headers.forEach((function(e, n) {
            return t[n] = e;
        })), n && n.headers.forEach((function(e, n) {
            return t[n] = e;
        }));
    }, t.prototype.oo = function(t, e) {
        var n = Wu[t];
        return this.so + "/v1/" + e + ":" + n;
    }, t;
}());

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Initializes the WebChannelConnection for the browser. */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The Platform's 'window' implementation or null if not available. */
function Ju() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */ function Xu() {
    // `document` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof document ? document : null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $u(t) {
    return new kr(t, /* useProto3Json= */ !0);
}

/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */ var Zu = /** @class */ function() {
    function t(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , r
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i) {
        void 0 === n && (n = 1e3), void 0 === r && (r = 1.5), void 0 === i && (i = 6e4), 
        this.js = t, this.timerId = e, this.lo = n, this.fo = r, this._o = i, this.wo = 0, 
        this.mo = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.yo = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    return t.prototype.reset = function() {
        this.wo = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.po = function() {
        this.wo = this._o;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.Io = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.wo + this.To()), r = Math.max(0, Date.now() - this.yo), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && U("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.wo + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
        this.mo = this.js.enqueueAfterDelay(this.timerId, i, (function() {
            return e.yo = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.wo *= this.fo, this.wo < this.lo && (this.wo = this.lo), this.wo > this._o && (this.wo = this._o);
    }, t.prototype.Eo = function() {
        null !== this.mo && (this.mo.skipDelay(), this.mo = null);
    }, t.prototype.cancel = function() {
        null !== this.mo && (this.mo.cancel(), this.mo = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype.To = function() {
        return (Math.random() - .5) * this.wo;
    }, t;
}(), ts = /** @class */ function() {
    function t(t, e, n, r, i, o, u, s) {
        this.js = t, this.Ao = n, this.Ro = r, this.bo = i, this.authCredentialsProvider = o, 
        this.appCheckCredentialsProvider = u, this.listener = s, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Po = 0, this.vo = null, this.Vo = null, this.stream = null, this.So = new Zu(t, e)
        /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */;
    }
    return t.prototype.Do = function() {
        return 1 /* Starting */ === this.state || 5 /* Backoff */ === this.state || this.Co();
    }, 
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t.prototype.Co = function() {
        return 2 /* Open */ === this.state || 3 /* Healthy */ === this.state;
    }, 
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    t.prototype.start = function() {
        4 /* Error */ !== this.state ? this.auth() : this.xo();
    }, 
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t.prototype.stop = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Do() ? [ 4 /*yield*/ , this.close(0 /* Initial */) ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    t.prototype.No = function() {
        this.state = 0 /* Initial */ , this.So.reset();
    }, 
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */
    t.prototype.ko = function() {
        var t = this;
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
                this.Co() && null === this.vo && (this.vo = this.js.enqueueAfterDelay(this.Ao, 6e4, (function() {
            return t.Oo();
        })));
    }, 
    /** Sends a message to the underlying stream. */ t.prototype.Mo = function(t) {
        this.Fo(), this.stream.send(t);
    }, 
    /** Called by the idle timer when the stream should close due to inactivity. */ t.prototype.Oo = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return this.Co() ? [ 2 /*return*/ , this.close(0 /* Initial */) ] : [ 2 /*return*/ ];
            }));
        }));
    }, 
    /** Marks the stream as active again. */ t.prototype.Fo = function() {
        this.vo && (this.vo.cancel(), this.vo = null);
    }, 
    /** Cancels the health check delayed operation. */ t.prototype.$o = function() {
        this.Vo && (this.Vo.cancel(), this.Vo = null);
    }, 
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */
    t.prototype.close = function(t, r) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.Fo(), this.$o(), this.So.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.Po++, 4 /* Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.So.reset() : r && r.code === H.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    B(r.toString()), B("Using maximum backoff delay to prevent overloading the backend."), 
                    this.So.po()) : r && r.code === H.UNAUTHENTICATED && 3 /* Healthy */ !== this.state && (
                    // "unauthenticated" error means the token was rejected. This should rarely
                    // happen since both Auth and AppCheck ensure a sufficient TTL when we
                    // request a token. If a user manually resets their system clock this can
                    // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
                    // before we received the first message and we need to invalidate the token
                    // to ensure that we fetch a new token.
                    this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.Bo(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.Jr(r) ];

                  case 1:
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    // Notify the listener that the stream closed.
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    t.prototype.Bo = function() {}, t.prototype.auth = function() {
        var t = this;
        this.state = 1 /* Starting */;
        var e = this.Lo(this.Po), n = this.Po;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                Promise.all([ this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken() ]).then((function(e) {
            var r = e[0], i = e[1];
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
                        t.Po === n && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            t.Uo(r, i);
        }), (function(n) {
            e((function() {
                var e = new Y(H.UNKNOWN, "Fetching auth token failed: " + n.message);
                return t.qo(e);
            }));
        }));
    }, t.prototype.Uo = function(t, e) {
        var n = this, r = this.Lo(this.Po);
        this.stream = this.Ko(t, e), this.stream.zr((function() {
            r((function() {
                return n.state = 2 /* Open */ , n.Vo = n.js.enqueueAfterDelay(n.Ro, 1e4, (function() {
                    return n.Co() && (n.state = 3 /* Healthy */), Promise.resolve();
                })), n.listener.zr();
            }));
        })), this.stream.Jr((function(t) {
            r((function() {
                return n.qo(t);
            }));
        })), this.stream.onMessage((function(t) {
            r((function() {
                return n.onMessage(t);
            }));
        }));
    }, t.prototype.xo = function() {
        var t = this;
        this.state = 5 /* Backoff */ , this.So.Io((function() {
            return e(t, void 0, void 0, (function() {
                return n(this, (function(t) {
                    return this.state = 0 /* Initial */ , this.start(), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, 
    // Visible for tests
    t.prototype.qo = function(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return U("PersistentStream", "close with error: " + t), this.stream = null, this.close(4 /* Error */ , t);
    }, 
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t.prototype.Lo = function(t) {
        var e = this;
        return function(n) {
            e.js.enqueueAndForget((function() {
                return e.Po === t ? n() : (U("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), es = /** @class */ function(e) {
    function n(t, n, r, i, o, u) {
        var s = this;
        return (s = e.call(this, t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , n, r, i, u) || this).wt = o, 
        s;
    }
    return t(n, e), n.prototype.Ko = function(t, e) {
        return this.bo.ho("Listen", t, e);
    }, n.prototype.onMessage = function(t) {
        // A successful response means the stream is healthy
        this.So.reset();
        var e = function(t, e) {
            var n;
            if ("targetChange" in e) {
                e.targetChange;
                // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
                // if unset
                var r = function(t) {
                    return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : j();
                }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], o = function(t, e) {
                    return t.dt ? (z(void 0 === e || "string" == typeof e), te.fromBase64String(e || "")) : (z(void 0 === e || e instanceof Uint8Array), 
                    te.fromUint8Array(e || new Uint8Array));
                }(t, e.targetChange.resumeToken), u = e.targetChange.cause, s = u && function(t) {
                    var e = void 0 === t.code ? H.UNKNOWN : ir(t.code);
                    return new Y(e, t.message || "");
                }(u);
                n = new Tr(r, i, o, s || null);
            } else if ("documentChange" in e) {
                e.documentChange;
                var a = e.documentChange;
                a.document, a.document.name, a.document.updateTime;
                var c = Pr(t, a.document.name), l = Mr(a.document.updateTime), h = new Me({
                    mapValue: {
                        fields: a.document.fields
                    }
                }), f = Le.newFoundDocument(c, l, h), d = a.targetIds || [], p = a.removedTargetIds || [];
                n = new Ir(d, p, f.key, f);
            } else if ("documentDelete" in e) {
                e.documentDelete;
                var v = e.documentDelete;
                v.document;
                var y = Pr(t, v.document), m = v.readTime ? Mr(v.readTime) : ft.min(), g = Le.newNoDocument(y, m), w = v.removedTargetIds || [];
                n = new Ir([], w, g.key, g);
            } else if ("documentRemove" in e) {
                e.documentRemove;
                var b = e.documentRemove;
                b.document;
                var I = Pr(t, b.document), E = b.removedTargetIds || [];
                n = new Ir([], E, I, null);
            } else {
                if (!("filter" in e)) return j();
                e.filter;
                var T = e.filter;
                T.targetId;
                var S = T.count || 0, D = new nr(S), _ = T.targetId;
                n = new Er(_, D);
            }
            return n;
        }(this.wt, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return ft.min();
            var e = t.targetChange;
            return e.targetIds && e.targetIds.length ? ft.min() : e.readTime ? Mr(e.readTime) : ft.min();
        }(t);
        return this.listener.Go(e, n);
    }, 
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.Qo = function(t) {
        var e = {};
        e.database = Br(this.wt), e.addTarget = function(t, e) {
            var n, r = e.target;
            return (n = Be(r) ? {
                documents: Wr(t, r)
            } : {
                query: Hr(t, r)
            }).targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = Vr(t, e.resumeToken) : e.snapshotVersion.compareTo(ft.min()) > 0 && (
            // TODO(wuandy): Consider removing above check because it is most likely true.
            // Right now, many tests depend on this behaviour though (leaving min() out
            // of serialization).
            n.readTime = Cr(t, e.snapshotVersion.toTimestamp())), n;
        }(this.wt, t);
        var n = function(t, e) {
            var n = function(t, e) {
                switch (e) {
                  case 0 /* Listen */ :
                    return null;

                  case 1 /* ExistenceFilterMismatch */ :
                    return "existence-filter-mismatch";

                  case 2 /* LimboResolution */ :
                    return "limbo-document";

                  default:
                    return j();
                }
            }(0, e.purpose);
            return null == n ? null : {
                "goog-listen-tags": n
            };
        }(this.wt, t);
        n && (e.labels = n), this.Mo(e);
    }, 
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.jo = function(t) {
        var e = {};
        e.database = Br(this.wt), e.removeTarget = t, this.Mo(e);
    }, n;
}(ts), ns = /** @class */ function(e) {
    function n(t, n, r, i, o, u) {
        var s = this;
        return (s = e.call(this, t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , n, r, i, u) || this).wt = o, 
        s.Wo = !1, s;
    }
    return t(n, e), Object.defineProperty(n.prototype, "zo", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.Wo;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.Wo = !1, this.lastStreamToken = void 0, e.prototype.start.call(this);
    }, n.prototype.Bo = function() {
        this.Wo && this.Ho([]);
    }, n.prototype.Ko = function(t, e) {
        return this.bo.ho("Write", t, e);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        z(!!t.streamToken), this.lastStreamToken = t.streamToken, this.Wo) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.So.reset();
            var e = function(t, e) {
                return t && t.length > 0 ? (z(void 0 !== e), t.map((function(t) {
                    return function(t, e) {
                        // NOTE: Deletes don't have an updateTime.
                        var n = t.updateTime ? Mr(t.updateTime) : Mr(e);
                        return n.isEqual(ft.min()) && (
                        // The Firestore Emulator currently returns an update time of 0 for
                        // deletes of non-existing documents (rather than null). This breaks the
                        // test "get deleted doc while offline with source=cache" as NoDocuments
                        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
                        // TODO(#2149): Remove this when Emulator is fixed
                        n = Mr(e)), new Pn(n, t.transformResults || []);
                    }(t, e);
                }))) : [];
            }(t.writeResults, t.commitTime), n = Mr(t.commitTime);
            return this.listener.Jo(n, e);
        }
        // The first response is always the handshake response
                return z(!t.writeResults || 0 === t.writeResults.length), this.Wo = !0, 
        this.listener.Yo();
    }, 
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.Xo = function() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        var t = {};
        t.database = Br(this.wt), this.Mo(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.Ho = function(t) {
        var e = this, n = {
            streamToken: this.lastStreamToken,
            writes: t.map((function(t) {
                return zr(e.wt, t);
            }))
        };
        this.Mo(n);
    }, n;
}(ts), rs = /** @class */ function(e) {
    function n(t, n, r, i) {
        var o = this;
        return (o = e.call(this) || this).authCredentials = t, o.appCheckCredentials = n, 
        o.bo = r, o.wt = i, o.Zo = !1, o;
    }
    return t(n, e), n.prototype.tu = function() {
        if (this.Zo) throw new Y(H.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Invokes the provided RPC with auth and AppCheck tokens. */ n.prototype.ro = function(t, e, n) {
        var r = this;
        return this.tu(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((function(i) {
            var o = i[0], u = i[1];
            return r.bo.ro(t, e, n, o, u);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === H.UNAUTHENTICATED && (r.authCredentials.invalidateToken(), 
            r.appCheckCredentials.invalidateToken()), t) : new Y(H.UNKNOWN, t.toString());
        }));
    }, 
    /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */ n.prototype.ao = function(t, e, n) {
        var r = this;
        return this.tu(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((function(i) {
            var o = i[0], u = i[1];
            return r.bo.ao(t, e, n, o, u);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === H.UNAUTHENTICATED && (r.authCredentials.invalidateToken(), 
            r.appCheckCredentials.invalidateToken()), t) : new Y(H.UNKNOWN, t.toString());
        }));
    }, n.prototype.terminate = function() {
        this.Zo = !0;
    }, n;
}((function() {})), is = /** @class */ function() {
    function t(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.eu = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.nu = null, 
        /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
        this.su = !0
        /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */;
    }
    return t.prototype.iu = function() {
        var t = this;
        0 === this.eu && (this.ru("Unknown" /* Unknown */), this.nu = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (function() {
            return t.nu = null, t.ou("Backend didn't respond within 10 seconds."), t.ru("Offline" /* Offline */), 
            Promise.resolve();
        })));
    }, 
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t.prototype.uu = function(t) {
        "Online" /* Online */ === this.state ? this.ru("Unknown" /* Unknown */) : (this.eu++, 
        this.eu >= 1 && (this.cu(), this.ou("Connection failed 1 times. Most recent error: " + t.toString()), 
        this.ru("Offline" /* Offline */)));
    }, 
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t.prototype.set = function(t) {
        this.cu(), this.eu = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.su = !1), this.ru(t);
    }, t.prototype.ru = function(t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t));
    }, t.prototype.ou = function(t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.su ? (B(e), this.su = !1) : U("OnlineStateTracker", e);
    }, t.prototype.cu = function() {
        null !== this.nu && (this.nu.cancel(), this.nu = null);
    }, t;
}(), os = function(
/**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
t, 
/** The client-side proxy for interacting with the backend. */
r, i, o, u) {
    var s = this;
    this.localStore = t, this.datastore = r, this.asyncQueue = i, this.remoteSyncer = {}, 
    /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
    this.au = [], 
    /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
    this.hu = new Map, 
    /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
    this.lu = new Set, 
    /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
    this.fu = [], this.du = u, this.du.Br((function(t) {
        i.enqueueAndForget((function() {
            return e(s, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return ps(this) ? (U("RemoteStore", "Restarting streams for network reachability change."), 
                        [ 4 /*yield*/ , function(t) {
                            return e(this, void 0, void 0, (function() {
                                var e;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = W(t)).lu.add(4 /* ConnectivityChange */), [ 4 /*yield*/ , ss(e) ];

                                      case 1:
                                        return n.sent(), e._u.set("Unknown" /* Unknown */), e.lu.delete(4 /* ConnectivityChange */), 
                                        [ 4 /*yield*/ , us(e) ];

                                      case 2:
                                        return n.sent(), [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }(this) ]) : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    })), this._u = new is(i, o);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */ function us(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (!ps(t)) return [ 3 /*break*/ , 4 ];
                e = 0, r = t.fu, n.label = 1;

              case 1:
                return e < r.length ? [ 4 /*yield*/ , (0, r[e])(/* enabled= */ !0) ] : [ 3 /*break*/ , 4 ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return e++, [ 3 /*break*/ , 1 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */ function ss(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = 0, r = t.fu, n.label = 1;

              case 1:
                return e < r.length ? [ 4 /*yield*/ , (0, r[e])(/* enabled= */ !1) ] : [ 3 /*break*/ , 4 ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return e++, [ 3 /*break*/ , 1 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */ function as(t, e) {
    var n = W(t);
    n.hu.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.hu.set(e.targetId, e), ds(n) ? 
    // The listen will be sent in onWatchStreamOpen
    fs(n) : ks(n).Co() && ls(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function cs(t, e) {
    var n = W(t), r = ks(n);
    n.hu.delete(e), r.Co() && hs(n, e), 0 === n.hu.size && (r.Co() ? r.ko() : ps(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n._u.set("Unknown" /* Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function ls(t, e) {
    t.wu.Nt(e.targetId), ks(t).Qo(e)
    /**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */;
}

function hs(t, e) {
    t.wu.Nt(e), ks(t).jo(e);
}

function fs(t) {
    t.wu = new Dr({
        getRemoteKeysForTarget: function(e) {
            return t.remoteSyncer.getRemoteKeysForTarget(e);
        },
        te: function(e) {
            return t.hu.get(e) || null;
        }
    }), ks(t).start(), t._u.iu()
    /**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */;
}

function ds(t) {
    return ps(t) && !ks(t).Do() && t.hu.size > 0;
}

function ps(t) {
    return 0 === W(t).lu.size;
}

function vs(t) {
    t.wu = void 0;
}

function ys(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return t.hu.forEach((function(e, n) {
                ls(t, e);
            })), [ 2 /*return*/ ];
        }));
    }));
}

function ms(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return vs(t), 
            // If we still need the watch stream, retry the connection.
            ds(t) ? (t._u.uu(r), fs(t)) : 
            // No need to restart watch stream because there are no active targets.
            // The online state is set to unknown because there is no active attempt
            // at establishing a connection
            t._u.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
        }));
    }));
}

function gs(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o, u, s;
        return n(this, (function(a) {
            switch (a.label) {
              case 0:
                if (t._u.set("Online" /* Online */), !(r instanceof Tr && 2 /* Removed */ === r.state && r.cause)) 
                // Mark the client as online since we got a message from the server
                return [ 3 /*break*/ , 6 ];
                a.label = 1;

              case 1:
                return a.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , 
                /** Handles an error on a target */
                function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i, o, u;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                e = r.cause, i = 0, o = r.targetIds, n.label = 1;

                              case 1:
                                return i < o.length ? (u = o[i], t.hu.has(u) ? [ 4 /*yield*/ , t.remoteSyncer.rejectListen(u, e) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                              case 2:
                                n.sent(), t.hu.delete(u), t.wu.removeTarget(u), n.label = 3;

                              case 3:
                                n.label = 4;

                              case 4:
                                return i++, [ 3 /*break*/ , 1 ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, r) ];

              case 2:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 3:
                return o = a.sent(), U("RemoteStore", "Failed to remove targets %s: %s ", r.targetIds.join(","), o), 
                [ 4 /*yield*/ , ws(t, o) ];

              case 4:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 5:
                return [ 3 /*break*/ , 13 ];

              case 6:
                if (r instanceof Ir ? t.wu.Ut(r) : r instanceof Er ? t.wu.zt(r) : t.wu.Gt(r), i.isEqual(ft.min())) return [ 3 /*break*/ , 13 ];
                a.label = 7;

              case 7:
                return a.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , Tu(t.localStore) ];

              case 8:
                return u = a.sent(), i.compareTo(u) >= 0 ? [ 4 /*yield*/ , 
                /**
                 * Takes a batch of changes from the Datastore, repackages them as a
                 * RemoteEvent, and passes that on to the listener, which is typically the
                 * SyncEngine.
                 */
                function(t, e) {
                    var n = t.wu.Yt(e);
                    // Update in-memory resume tokens. LocalStore will update the
                    // persistent view of these when applying the completed RemoteEvent.
                                        return n.targetChanges.forEach((function(n, r) {
                        if (n.resumeToken.approximateByteSize() > 0) {
                            var i = t.hu.get(r);
                            // A watched target might have been removed already.
                                                        i && t.hu.set(r, i.withResumeToken(n.resumeToken, e));
                        }
                    })), 
                    // Re-establish listens for the targets that have been invalidated by
                    // existence filter mismatches.
                    n.targetMismatches.forEach((function(e) {
                        var n = t.hu.get(e);
                        if (n) {
                            // Clear the resume token for the target, since we're in a known mismatch
                            // state.
                            t.hu.set(e, n.withResumeToken(te.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                            // Cause a hard reset by unwatching and rewatching immediately, but
                            // deliberately don't send a resume token so that we get a full update.
                            hs(t, e);
                            // Mark the target we send as being on behalf of an existence filter
                            // mismatch, but don't actually retain that in listenTargets. This ensures
                            // that we flag the first re-listen this way without impacting future
                            // listens of this target (that might happen e.g. on reconnect).
                            var r = new Fi(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                            ls(t, r);
                        }
                    })), t.remoteSyncer.applyRemoteEvent(n);
                }(t, i) ] : [ 3 /*break*/ , 10 ];

                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                              case 9:
                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                a.sent(), a.label = 10;

              case 10:
                return [ 3 /*break*/ , 13 ];

              case 11:
                return U("RemoteStore", "Failed to raise snapshot:", s = a.sent()), [ 4 /*yield*/ , ws(t, s) ];

              case 12:
                return a.sent(), [ 3 /*break*/ , 13 ];

              case 13:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */ function ws(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o = this;
        return n(this, (function(u) {
            switch (u.label) {
              case 0:
                if (!Rt(r)) throw r;
                // Disable network and raise offline snapshots
                return t.lu.add(1 /* IndexedDbFailed */), [ 4 /*yield*/ , ss(t) ];

              case 1:
                // Disable network and raise offline snapshots
                return u.sent(), t._u.set("Offline" /* Offline */), i || (
                // Use a simple read operation to determine if IndexedDB recovered.
                // Ideally, we would expose a health check directly on SimpleDb, but
                // RemoteStore only has access to persistence through LocalStore.
                i = function() {
                    return Tu(t.localStore);
                }), 
                // Probe IndexedDB periodically and re-enable network
                t.asyncQueue.enqueueRetryable((function() {
                    return e(o, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return U("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , i() ];

                              case 1:
                                return e.sent(), t.lu.delete(1 /* IndexedDbFailed */), [ 4 /*yield*/ , us(t) ];

                              case 2:
                                return e.sent(), [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */ function bs(t, e) {
    return e().catch((function(n) {
        return ws(t, n, e);
    }));
}

function Is(t) {
    return e(this, void 0, void 0, (function() {
        var e, r, i, o, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = W(t), r = Cs(e), i = e.au.length > 0 ? e.au[e.au.length - 1].batchId : -1, n.label = 1;

              case 1:
                if (!
                /**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */
                function(t) {
                    return ps(t) && t.au.length < 10;
                }
                /**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ (e)) return [ 3 /*break*/ , 7 ];
                n.label = 2;

              case 2:
                return n.trys.push([ 2, 4, , 6 ]), [ 4 /*yield*/ , _u(e.localStore, i) ];

              case 3:
                return null === (o = n.sent()) ? (0 === e.au.length && r.ko(), [ 3 /*break*/ , 7 ]) : (i = o.batchId, 
                function(t, e) {
                    t.au.push(e);
                    var n = Cs(t);
                    n.Co() && n.zo && n.Ho(e.mutations);
                }(e, o), [ 3 /*break*/ , 6 ]);

              case 4:
                return u = n.sent(), [ 4 /*yield*/ , ws(e, u) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 3 /*break*/ , 1 ];

              case 7:
                return Es(e) && Ts(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function Es(t) {
    return ps(t) && !Cs(t).Do() && t.au.length > 0;
}

function Ts(t) {
    Cs(t).start();
}

function Ss(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return Cs(t).Xo(), [ 2 /*return*/ ];
        }));
    }));
}

function Ds(t) {
    return e(this, void 0, void 0, (function() {
        var e, r, i, o;
        return n(this, (function(n) {
            // Send the write pipeline now that the stream is established.
            for (e = Cs(t), r = 0, i = t.au; r < i.length; r++) o = i[r], e.Ho(o.mutations);
            return [ 2 /*return*/ ];
        }));
    }));
}

function _s(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = t.au.shift(), o = Ri.from(e, r, i), [ 4 /*yield*/ , bs(t, (function() {
                    return t.remoteSyncer.applySuccessfulWrite(o);
                })) ];

              case 1:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return n.sent(), [ 4 /*yield*/ , Is(t) ];

              case 2:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return n.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

function xs(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(i) {
            switch (i.label) {
              case 0:
                return r && Cs(t).zo ? [ 4 /*yield*/ , function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return rr(i = r.code) && i !== H.ABORTED ? (e = t.au.shift(), 
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                Cs(t).No(), [ 4 /*yield*/ , bs(t, (function() {
                                    return t.remoteSyncer.rejectFailedWrite(e.batchId, r);
                                })) ]) : [ 3 /*break*/ , 3 ];

                              case 1:
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                return n.sent(), [ 4 /*yield*/ , Is(t) ];

                              case 2:
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                n.sent(), n.label = 3;

                              case 3:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, r) ] : [ 3 /*break*/ , 2 ];

                // This error affects the actual write.
                              case 1:
                // This error affects the actual write.
                i.sent(), i.label = 2;

              case 2:
                // If the write stream closed after the write handshake completes, a write
                // operation failed and we fail the pending operation.
                // The write stream might have been started by refilling the write
                // pipeline for failed writes
                return Es(t) && Ts(t), [ 2 /*return*/ ];
            }
        }));
    }));
}

function Ns(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return (e = W(t)).asyncQueue.verifyOperationInProgress(), U("RemoteStore", "RemoteStore received new credentials"), 
                i = ps(e), 
                // Tear down and re-create our network streams. This will ensure we get a
                // fresh auth token for the new user and re-fill the write pipeline with
                // new mutations from the LocalStore (since mutations are per-user).
                e.lu.add(3 /* CredentialChange */), [ 4 /*yield*/ , ss(e) ];

              case 1:
                return n.sent(), i && 
                // Don't set the network status to Unknown if we are offline.
                e._u.set("Unknown" /* Unknown */), [ 4 /*yield*/ , e.remoteSyncer.handleCredentialChange(r) ];

              case 2:
                return n.sent(), e.lu.delete(3 /* CredentialChange */), [ 4 /*yield*/ , us(e) ];

              case 3:
                // Tear down and re-create our network streams. This will ensure we get a
                // fresh auth token for the new user and re-fill the write pipeline with
                // new mutations from the LocalStore (since mutations are per-user).
                return n.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ function As(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = W(t), r ? (e.lu.delete(2 /* IsSecondary */), [ 4 /*yield*/ , us(e) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return n.sent(), [ 3 /*break*/ , 5 ];

              case 2:
                return r ? [ 3 /*break*/ , 4 ] : (e.lu.add(2 /* IsSecondary */), [ 4 /*yield*/ , ss(e) ]);

              case 3:
                n.sent(), e._u.set("Unknown" /* Unknown */), n.label = 4;

              case 4:
                n.label = 5;

              case 5:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function ks(t) {
    var r = this;
    return t.mu || (
    // Create stream (but note that it is not started yet).
    t.mu = function(t, e, n) {
        var r = W(t);
        return r.tu(), new es(e, r.bo, r.authCredentials, r.appCheckCredentials, r.wt, n);
    }(t.datastore, t.asyncQueue, {
        zr: ys.bind(null, t),
        Jr: ms.bind(null, t),
        Go: gs.bind(null, t)
    }), t.fu.push((function(i) {
        return e(r, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.mu.No(), ds(t) ? fs(t) : t._u.set("Unknown" /* Unknown */), [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , t.mu.stop() ];

                  case 2:
                    e.sent(), vs(t), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.mu
    /**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */;
}

function Cs(t) {
    var r = this;
    return t.gu || (
    // Create stream (but note that it is not started yet).
    t.gu = function(t, e, n) {
        var r = W(t);
        return r.tu(), new ns(e, r.bo, r.authCredentials, r.appCheckCredentials, r.wt, n);
    }(t.datastore, t.asyncQueue, {
        zr: Ss.bind(null, t),
        Jr: xs.bind(null, t),
        Yo: Ds.bind(null, t),
        Jo: _s.bind(null, t)
    }), t.fu.push((function(i) {
        return e(r, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.gu.No(), [ 4 /*yield*/ , Is(t) ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    return [ 4 /*yield*/ , t.gu.stop() ];

                  case 3:
                    e.sent(), t.au.length > 0 && (U("RemoteStore", "Stopping write stream with " + t.au.length + " pending writes"), 
                    t.au = []), e.label = 4;

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.gu
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */;
}

var Vs = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, 
        this.deferred = new J, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch((function(t) {}))
        /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */;
    }
    return t.createAndSchedule = function(e, n, r, i, o) {
        var u = new t(e, n, Date.now() + r, i, o);
        return u.start(r), u;
    }, 
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t.prototype.start = function(t) {
        var e = this;
        this.timerHandle = setTimeout((function() {
            return e.handleDelayElapsed();
        }), t);
    }, 
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t.prototype.skipDelay = function() {
        return this.handleDelayElapsed();
    }, 
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t.prototype.cancel = function(t) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new Y(H.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }, t.prototype.handleDelayElapsed = function() {
        var t = this;
        this.asyncQueue.enqueueAndForget((function() {
            return null !== t.timerHandle ? (t.clearTimeout(), t.op().then((function(e) {
                return t.deferred.resolve(e);
            }))) : Promise.resolve();
        }));
    }, t.prototype.clearTimeout = function() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), 
        this.timerHandle = null);
    }, t;
}();

/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */ function Os(t, e) {
    if (B("AsyncQueue", e + ": " + t), Rt(t)) return new Y(H.UNAVAILABLE, e + ": " + t);
    throw t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ var Ms = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? function(e, n) {
            return t(e, n) || mt.comparator(e.key, n.key);
        } : function(t, e) {
            return mt.comparator(t.key, e.key);
        }, this.keyedMap = cr(), this.sortedSet = new Qt(this.comparator)
        /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */;
    }
    return t.emptySet = function(e) {
        return new t(e.comparator);
    }, t.prototype.has = function(t) {
        return null != this.keyedMap.get(t);
    }, t.prototype.get = function(t) {
        return this.keyedMap.get(t);
    }, t.prototype.first = function() {
        return this.sortedSet.minKey();
    }, t.prototype.last = function() {
        return this.sortedSet.maxKey();
    }, t.prototype.isEmpty = function() {
        return this.sortedSet.isEmpty();
    }, 
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t.prototype.indexOf = function(t) {
        var e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1;
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.sortedSet.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Iterates documents in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.sortedSet.inorderTraversal((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Inserts or updates a document with the same key */ t.prototype.add = function(t) {
        // First remove the element if we have it.
        var e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
    }, 
    /** Deletes a document with a given key */ t.prototype.delete = function(t) {
        var e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.sortedSet.getIterator(), r = e.sortedSet.getIterator(); n.hasNext(); ) {
            var i = n.getNext().key, o = r.getNext().key;
            if (!i.isEqual(o)) return !1;
        }
        return !0;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }, t.prototype.copy = function(e, n) {
        var r = new t;
        return r.comparator = this.comparator, r.keyedMap = e, r.sortedSet = n, r;
    }, t;
}(), Rs = /** @class */ function() {
    function t() {
        this.yu = new Qt(mt.comparator);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.yu.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.yu = this.yu.insert(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.yu = this.yu.insert(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.yu = this.yu.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.yu = this.yu.insert(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.yu = this.yu.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.yu = this.yu.insert(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.yu = this.yu.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        j() : this.yu = this.yu.insert(e, t);
    }, t.prototype.pu = function() {
        var t = [];
        return this.yu.inorderTraversal((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), Ls = /** @class */ function() {
    function t(t, e, n, r, i, o, u, s) {
        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, 
        this.fromCache = o, this.syncStateChanged = u, this.excludesMetadataChanges = s
        /** Returns a view snapshot as if all documents in the snapshot were added. */;
    }
    return t.fromInitialDocuments = function(e, n, r, i) {
        var o = [];
        return n.forEach((function(t) {
            o.push({
                type: 0 /* Added */ ,
                doc: t
            });
        })), new t(e, n, Ms.emptySet(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.mutatedKeys.isEmpty();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && vn(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), Fs = function() {
    this.Iu = void 0, this.listeners = [];
}, Ps = function() {
    this.queries = new or((function(t) {
        return yn(t);
    }), vn), this.onlineState = "Unknown" /* Unknown */ , this.Tu = new Set;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ function qs(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, u, s, a, c;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (e = W(t), i = r.query, o = !1, (u = e.queries.get(i)) || (o = !0, u = new Fs), 
                !o) return [ 3 /*break*/ , 4 ];
                n.label = 1;

              case 1:
                return n.trys.push([ 1, 3, , 4 ]), s = u, [ 4 /*yield*/ , e.onListen(i) ];

              case 2:
                return s.Iu = n.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                return a = n.sent(), c = Os(a, "Initialization of query '" + mn(r.query) + "' failed"), 
                [ 2 /*return*/ , void r.onError(c) ];

              case 4:
                return e.queries.set(i, u), u.listeners.push(r), 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                r.Eu(e.onlineState), u.Iu && r.Au(u.Iu) && Gs(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function Us(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, u, s;
        return n(this, (function(n) {
            return e = W(t), i = r.query, o = !1, (u = e.queries.get(i)) && (s = u.listeners.indexOf(r)) >= 0 && (u.listeners.splice(s, 1), 
            o = 0 === u.listeners.length), o ? [ 2 /*return*/ , (e.queries.delete(i), e.onUnlisten(i)) ] : [ 2 /*return*/ ];
        }));
    }));
}

function Bs(t, e) {
    for (var n = W(t), r = !1, i = 0, o = e; i < o.length; i++) {
        var u = o[i], s = u.query, a = n.queries.get(s);
        if (a) {
            for (var c = 0, l = a.listeners; c < l.length; c++) {
                l[c].Au(u) && (r = !0);
            }
            a.Iu = u;
        }
    }
    r && Gs(n);
}

function Ks(t, e, n) {
    var r = W(t), i = r.queries.get(e);
    if (i) for (var o = 0, u = i.listeners; o < u.length; o++) {
        u[o].onError(n);
    }
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        r.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function Gs(t) {
    t.Tu.forEach((function(t) {
        t.next();
    }));
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ var js = /** @class */ function() {
    function t(t, e, n) {
        this.query = t, this.Ru = e, 
        /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
        this.bu = !1, this.Pu = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {}
        /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */;
    }
    return t.prototype.Au = function(t) {
        if (!this.options.includeMetadataChanges) {
            for (
            // Remove the metadata only changes.
            var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                var i = r[n];
                3 /* Metadata */ !== i.type && e.push(i);
            }
            t = new Ls(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
            /* excludesMetadataChanges= */ !0);
        }
        var o = !1;
        return this.bu ? this.vu(t) && (this.Ru.next(t), o = !0) : this.Vu(t, this.onlineState) && (this.Su(t), 
        o = !0), this.Pu = t, o;
    }, t.prototype.onError = function(t) {
        this.Ru.error(t);
    }, 
    /** Returns whether a snapshot was raised. */ t.prototype.Eu = function(t) {
        this.onlineState = t;
        var e = !1;
        return this.Pu && !this.bu && this.Vu(this.Pu, t) && (this.Su(this.Pu), e = !0), 
        e;
    }, t.prototype.Vu = function(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                var n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return !(this.options.Du && n || t.docs.isEmpty() && "Offline" /* Offline */ !== e);
        // Raise data from cache if we have any documents or we are offline
        }, t.prototype.vu = function(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        var e = this.Pu && this.Pu.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }, t.prototype.Su = function(t) {
        t = Ls.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.bu = !0, 
        this.Ru.next(t);
    }, t;
}(), zs = /** @class */ function() {
    function t(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.payload = t, this.byteLength = e;
    }
    return t.prototype.Cu = function() {
        return "metadata" in this.payload;
    }, t;
}(), Qs = /** @class */ function() {
    function t(t) {
        this.wt = t;
    }
    return t.prototype.Wi = function(t) {
        return Pr(this.wt, t);
    }, 
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    t.prototype.zi = function(t) {
        return t.metadata.exists ? jr(this.wt, t.document, !1) : Le.newNoDocument(this.Wi(t.metadata.name), this.Hi(t.metadata.readTime));
    }, t.prototype.Hi = function(t) {
        return Mr(t);
    }, t;
}(), Ws = /** @class */ function() {
    function t(t, e, n) {
        this.xu = t, this.localStore = e, this.wt = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], 
        /** The collection groups affected by this bundle. */
        this.collectionGroups = new Set, this.progress = Hs(t)
        /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */;
    }
    return t.prototype.Nu = function(t) {
        this.progress.bytesLoaded += t.byteLength;
        var e = this.progress.documentsLoaded;
        if (t.payload.namedQuery) this.queries.push(t.payload.namedQuery); else if (t.payload.documentMetadata) {
            this.documents.push({
                metadata: t.payload.documentMetadata
            }), t.payload.documentMetadata.exists || ++e;
            var n = pt.fromString(t.payload.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
        } else t.payload.document && (this.documents[this.documents.length - 1].document = t.payload.document, 
        ++e);
        return e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, 
        Object.assign({}, this.progress)) : null;
    }, t.prototype.ku = function(t) {
        for (var e = new Map, n = new Qs(this.wt), r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            if (o.metadata.queries) for (var u = n.Wi(o.metadata.name), s = 0, a = o.metadata.queries; s < a.length; s++) {
                var c = a[s], l = (e.get(c) || yr()).add(u);
                e.set(c, l);
            }
        }
        return e;
    }, 
    /**
     * Update the progress to 'Success' and return the updated progress.
     */
    t.prototype.complete = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , Ou(this.localStore, new Qs(this.wt), this.documents, this.xu.id) ];

                  case 1:
                    t = n.sent(), e = this.ku(this.documents), r = 0, i = this.queries, n.label = 2;

                  case 2:
                    return r < i.length ? (o = i[r], [ 4 /*yield*/ , Mu(this.localStore, o, e.get(o.name)) ]) : [ 3 /*break*/ , 5 ];

                  case 3:
                    n.sent(), n.label = 4;

                  case 4:
                    return r++, [ 3 /*break*/ , 2 ];

                  case 5:
                    return [ 2 /*return*/ , (this.progress.taskState = "Success", {
                        progress: this.progress,
                        Ou: this.collectionGroups,
                        Mu: t
                    }) ];
                }
            }));
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A complete element in the bundle stream, together with the byte length it
 * occupies in the stream.
 */
/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */
function Hs(t) {
    return {
        taskState: "Running",
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: t.totalDocuments,
        totalBytes: t.totalBytes
    };
}

/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ys = function(t) {
    this.key = t;
}, Js = function(t) {
    this.key = t;
}, Xs = /** @class */ function() {
    function t(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.Fu = e, this.$u = null, 
        /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
        this.current = !1, 
        /** Documents in the view but not in the remote target */
        this.Bu = yr(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = yr(), this.Lu = bn(t), this.Uu = new Ms(this.Lu);
    }
    return Object.defineProperty(t.prototype, "qu", {
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */
        get: function() {
            return this.Fu;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */
    t.prototype.Ku = function(t, e) {
        var n = this, r = e ? e.Gu : new Rs, i = e ? e.Uu : this.Uu, o = e ? e.mutatedKeys : this.mutatedKeys, u = i, s = !1, a = "F" /* First */ === this.query.limitType && i.size === this.query.limit ? i.last() : null, c = "L" /* Last */ === this.query.limitType && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal((function(t, e) {
            var l = i.get(t), h = gn(n.query, e) ? e : null, f = !!l && n.mutatedKeys.has(l.key), d = !!h && (h.hasLocalMutations || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.mutatedKeys.has(h.key) && h.hasCommittedMutations), p = !1;
            // Calculate change
            l && h ? l.data.isEqual(h.data) ? f !== d && (r.track({
                type: 3 /* Metadata */ ,
                doc: h
            }), p = !0) : n.Qu(l, h) || (r.track({
                type: 2 /* Modified */ ,
                doc: h
            }), p = !0, (a && n.Lu(h, a) > 0 || c && n.Lu(h, c) < 0) && (
            // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            s = !0)) : !l && h ? (r.track({
                type: 0 /* Added */ ,
                doc: h
            }), p = !0) : l && !h && (r.track({
                type: 1 /* Removed */ ,
                doc: l
            }), p = !0, (a || c) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            s = !0)), p && (h ? (u = u.add(h), o = d ? o.add(t) : o.delete(t)) : (u = u.delete(t), 
            o = o.delete(t)));
        })), null !== this.query.limit) for (;u.size > this.query.limit; ) {
            var l = "F" /* First */ === this.query.limitType ? u.last() : u.first();
            u = u.delete(l.key), o = o.delete(l.key), r.track({
                type: 1 /* Removed */ ,
                doc: l
            });
        }
        return {
            Uu: u,
            Gu: r,
            Oi: s,
            mutatedKeys: o
        };
    }, t.prototype.Qu = function(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
    }, 
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    t.prototype.applyChanges = function(t, e, n) {
        var r = this, i = this.Uu;
        this.Uu = t.Uu, this.mutatedKeys = t.mutatedKeys;
        // Sort changes based on type and query comparator
        var o = t.Gu.pu();
        o.sort((function(t, e) {
            return function(t, e) {
                var n = function(t) {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return j();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.Lu(t.doc, e.doc);
        })), this.ju(n);
        var u = e ? this.Wu() : [], s = 0 === this.Bu.size && this.current ? 1 /* Synced */ : 0 /* Local */ , a = s !== this.$u;
        return this.$u = s, 0 !== o.length || a ? {
            snapshot: new Ls(this.query, t.Uu, i, o, t.mutatedKeys, 0 /* Local */ === s, a, 
            /* excludesMetadataChanges= */ !1),
            zu: u
        } : {
            zu: u
        };
        // no changes
        }, 
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t.prototype.Eu = function(t) {
        return this.current && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.current = !1, this.applyChanges({
            Uu: this.Uu,
            Gu: new Rs,
            mutatedKeys: this.mutatedKeys,
            Oi: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            zu: []
        };
    }, 
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t.prototype.Hu = function(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.Fu.has(t) && 
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.Uu.has(t) && !this.Uu.get(t).hasLocalMutations;
    }, 
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t.prototype.ju = function(t) {
        var e = this;
        t && (t.addedDocuments.forEach((function(t) {
            return e.Fu = e.Fu.add(t);
        })), t.modifiedDocuments.forEach((function(t) {})), t.removedDocuments.forEach((function(t) {
            return e.Fu = e.Fu.delete(t);
        })), this.current = t.current);
    }, t.prototype.Wu = function() {
        var t = this;
        // We can only determine limbo documents when we're in-sync with the server.
                if (!this.current) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                var e = this.Bu;
        this.Bu = yr(), this.Uu.forEach((function(e) {
            t.Hu(e.key) && (t.Bu = t.Bu.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.Bu.has(e) || n.push(new Js(e));
        })), this.Bu.forEach((function(t) {
            e.has(t) || n.push(new Ys(t));
        })), n;
    }, 
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Ju = function(t) {
        this.Fu = t.ji, this.Bu = yr();
        var e = this.Ku(t.documents);
        return this.applyChanges(e, /*updateLimboDocuments=*/ !0);
    }, 
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Yu = function() {
        return Ls.fromInitialDocuments(this.query, this.Uu, this.mutatedKeys, 0 /* Local */ === this.$u);
    }, t;
}(), $s = function(
/**
     * The query itself.
     */
t, 
/**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
e, 
/**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
n) {
    this.query = t, this.targetId = e, this.view = n;
}, Zs = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.Xu = !1;
}, ta = /** @class */ function() {
    function t(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    r, i, o) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.Zu = {}, this.tc = new or((function(t) {
            return yn(t);
        }), vn), this.ec = new Map, 
        /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query. The strings in this set are the result of calling
             * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
             *
             * The `Set` type was chosen because it provides efficient lookup and removal
             * of arbitrary elements and it also maintains insertion order, providing the
             * desired queue-like FIFO semantics.
             */
        this.nc = new Set, 
        /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
        this.sc = new Qt(mt.comparator), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.ic = new Map, this.rc = new eu, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.oc = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.uc = new Map, this.cc = Co.Rn(), this.onlineState = "Unknown" /* Unknown */ , 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.ac = void 0;
    }
    return Object.defineProperty(t.prototype, "isPrimaryClient", {
        get: function() {
            return !0 === this.ac;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}();

/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
function ea(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, u, s, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = ka(t), (u = e.tc.get(r)) ? (
                // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                // already exists when EventManager calls us for the first time. This
                // happens when the primary tab is already listening to this query on
                // behalf of another tab and the user of the primary also starts listening
                // to the query. EventManager will not have an assigned target ID in this
                // case and calls `listen` to obtain this ID.
                i = u.targetId, e.sharedClientState.addLocalQueryTarget(i), o = u.view.Yu(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

              case 1:
                return [ 4 /*yield*/ , xu(e.localStore, dn(r)) ];

              case 2:
                return s = n.sent(), e.isPrimaryClient && as(e.remoteStore, s), a = e.sharedClientState.addLocalQueryTarget(s.targetId), 
                i = s.targetId, [ 4 /*yield*/ , na(e, r, i, "current" === a) ];

              case 3:
                o = n.sent(), n.label = 4;

              case 4:
                return [ 2 /*return*/ , o ];
            }
        }));
    }));
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ function na(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var u, s, a, c, l, h;
        return n(this, (function(f) {
            switch (f.label) {
              case 0:
                // PORTING NOTE: On Web only, we inject the code that registers new Limbo
                // targets based on view changes. This allows us to only depend on Limbo
                // changes when user code includes queries.
                return t.hc = function(r, i, o) {
                    return function(t, r, i, o) {
                        return e(this, void 0, void 0, (function() {
                            var e, u, s;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = r.view.Ku(i), e.Oi ? [ 4 /*yield*/ , Au(t.localStore, r.query, 
                                    /* usePreviousResults= */ !1).then((function(t) {
                                        var n = t.documents;
                                        return r.view.Ku(n, e);
                                    })) ] : [ 3 /*break*/ , 2 ];

                                  case 1:
                                    // The query has a limit and some docs were removed, so we need
                                    // to re-run the query against the local store to make sure we
                                    // didn't lose any good docs that had been past the limit.
                                    e = n.sent(), n.label = 2;

                                  case 2:
                                    return u = o && o.targetChanges.get(r.targetId), s = r.view.applyChanges(e, 
                                    /* updateLimboDocuments= */ t.isPrimaryClient, u), [ 2 /*return*/ , (va(t, r.targetId, s.zu), 
                                    s.snapshot) ];
                                }
                            }));
                        }));
                    }(t, r, i, o);
                }, [ 4 /*yield*/ , Au(t.localStore, r, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return u = f.sent(), s = new Xs(r, u.ji), a = s.Ku(u.documents), c = br.createSynthesizedTargetChangeForCurrentChange(i, o && "Offline" /* Offline */ !== t.onlineState), 
                l = s.applyChanges(a, 
                /* updateLimboDocuments= */ t.isPrimaryClient, c), va(t, i, l.zu), h = new $s(r, i, s), 
                [ 2 /*return*/ , (t.tc.set(r, h), t.ec.has(i) ? t.ec.get(i).push(r) : t.ec.set(i, [ r ]), 
                l.snapshot) ];
            }
        }));
    }));
}

/** Stops listening to the query. */ function ra(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = W(t), i = e.tc.get(r), (o = e.ec.get(i.targetId)).length > 1 ? [ 2 /*return*/ , (e.ec.set(i.targetId, o.filter((function(t) {
                    return !vn(t, r);
                }))), void e.tc.delete(r)) ] : e.isPrimaryClient ? (
                // We need to remove the local query target first to allow us to verify
                // whether any other client is still interested in this target.
                e.sharedClientState.removeLocalQueryTarget(i.targetId), e.sharedClientState.isActiveQueryTarget(i.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , Nu(e.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !1).then((function() {
                    e.sharedClientState.clearQueryState(i.targetId), cs(e.remoteStore, i.targetId), 
                    da(e, i.targetId);
                })).catch(At) ]) : [ 3 /*break*/ , 3 ];

              case 1:
                n.sent(), n.label = 2;

              case 2:
                return [ 3 /*break*/ , 5 ];

              case 3:
                return da(e, i.targetId), [ 4 /*yield*/ , Nu(e.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !0) ];

              case 4:
                n.sent(), n.label = 5;

              case 5:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */ function ia(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, u, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = Ca(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 5, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n, r, i = W(t), o = ht.now(), u = e.reduce((function(t, e) {
                        return t.add(e.key);
                    }), yr());
                    return i.persistence.runTransaction("Locally write mutations", "readwrite", (function(t) {
                        // Figure out which keys do not have a remote version in the cache, this
                        // is needed to create the right overlay mutation: if no remote version
                        // presents, we do not need to create overlays as patch mutations.
                        // TODO(Overlay): Is there a better way to determine this? Using the
                        //  document version does not work because local mutations set them back
                        //  to 0.
                        var s = sr(), a = yr();
                        return i.Ui.getEntries(t, u).next((function(t) {
                            (s = t).forEach((function(t, e) {
                                e.isValidDocument() || (a = a.add(t));
                            }));
                        })).next((function() {
                            return i.localDocuments.getOverlayedDocuments(t, s);
                        })).next((function(r) {
                            n = r;
                            for (
                            // For non-idempotent mutations (such as `FieldValue.increment()`),
                            // we record the base state in a separate patch mutation. This is
                            // later used to guarantee consistent values and prevents flicker
                            // even if the backend sends us an update that already includes our
                            // transform.
                            var u = [], s = 0, a = e; s < a.length; s++) {
                                var c = a[s], l = zn(c, n.get(c.key).overlayedDocument);
                                null != l && 
                                // NOTE: The base state should only be applied if there's some
                                // existing document to override, so use a Precondition of
                                // exists=true
                                u.push(new Hn(c.key, l, Re(l.value.mapValue), qn.exists(!0)));
                            }
                            return i.mutationQueue.addMutationBatch(t, o, u, e);
                        })).next((function(e) {
                            r = e;
                            var o = e.applyToLocalDocumentSet(n, a);
                            return i.documentOverlayCache.saveOverlays(t, e.batchId, o);
                        }));
                    })).then((function() {
                        return {
                            batchId: r.batchId,
                            changes: lr(n)
                        };
                    }));
                }(e.localStore, r) ];

              case 2:
                return o = n.sent(), e.sharedClientState.addPendingMutation(o.batchId), function(t, e, n) {
                    var r = t.oc[t.currentUser.toKey()];
                    r || (r = new Qt(at)), r = r.insert(e, n), t.oc[t.currentUser.toKey()] = r;
                }(e, o.batchId, i), [ 4 /*yield*/ , ga(e, o.changes) ];

              case 3:
                return n.sent(), [ 4 /*yield*/ , Is(e.remoteStore) ];

              case 4:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 5:
                return u = n.sent(), s = Os(u, "Failed to persist write"), i.reject(s), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */ function oa(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = W(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , Su(e.localStore, r) ];

              case 2:
                return i = n.sent(), 
                // Update `receivedDocument` as appropriate for any limbo targets.
                r.targetChanges.forEach((function(t, n) {
                    var r = e.ic.get(n);
                    r && (
                    // Since this is a limbo resolution lookup, it's for a single document
                    // and it could be added, modified, or removed, but not a combination.
                    z(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
                    t.addedDocuments.size > 0 ? r.Xu = !0 : t.modifiedDocuments.size > 0 ? z(r.Xu) : t.removedDocuments.size > 0 && (z(r.Xu), 
                    r.Xu = !1));
                })), [ 4 /*yield*/ , ga(e, i, r) ];

              case 3:
                // Update `receivedDocument` as appropriate for any limbo targets.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , At(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */ function ua(t, e, n) {
    var r = W(t);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
        if (r.isPrimaryClient && 0 /* RemoteStore */ === n || !r.isPrimaryClient && 1 /* SharedClientState */ === n) {
        var i = [];
        r.tc.forEach((function(t, n) {
            var r = n.view.Eu(e);
            r.snapshot && i.push(r.snapshot);
        })), function(t, e) {
            var n = W(t);
            n.onlineState = e;
            var r = !1;
            n.queries.forEach((function(t, n) {
                for (var i = 0, o = n.listeners; i < o.length; i++) {
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    o[i].Eu(e) && (r = !0);
                }
            })), r && Gs(n);
        }(r.eventManager, e), i.length && r.Zu.Go(i), r.onlineState = e, r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
    }
}

/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */ function sa(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, u, s, a, c;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                // PORTING NOTE: Multi-tab only.
                return (e = W(t)).sharedClientState.updateQueryState(r, "rejected", i), o = e.ic.get(r), 
                (u = o && o.key) ? (
                // TODO(b/217189216): This limbo document should ideally have a read time,
                // so that it is picked up by any read-time based scans. The backend,
                // however, does not send a read time for target removals.
                s = (s = new Qt(mt.comparator)).insert(u, Le.newNoDocument(u, ft.min())), a = yr().add(u), 
                c = new wr(ft.min(), 
                /* targetChanges= */ new Map, 
                /* targetMismatches= */ new Yt(at), s, a), [ 4 /*yield*/ , oa(e, c) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return n.sent(), 
                // Since this query failed, we won't want to manually unlisten to it.
                // We only remove it from bookkeeping after we successfully applied the
                // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
                // this query when the RemoteStore restarts the Watch stream, which should
                // re-trigger the target failure.
                e.sc = e.sc.remove(u), e.ic.delete(r), ma(e), [ 3 /*break*/ , 4 ];

              case 2:
                return [ 4 /*yield*/ , Nu(e.localStore, r, 
                /* keepPersistedTargetData */ !1).then((function() {
                    return da(e, r, i);
                })).catch(At) ];

              case 3:
                n.sent(), n.label = 4;

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function aa(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = W(t), i = r.batch.batchId, n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , Eu(e.localStore, r) ];

              case 2:
                return o = n.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                fa(e, i, /*error=*/ null), ha(e, i), e.sharedClientState.updateMutationState(i, "acknowledged"), 
                [ 4 /*yield*/ , ga(e, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , At(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function ca(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = W(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n = W(t);
                    return n.persistence.runTransaction("Reject batch", "readwrite-primary", (function(t) {
                        var r;
                        return n.mutationQueue.lookupMutationBatch(t, e).next((function(e) {
                            return z(null !== e), r = e.keys(), n.mutationQueue.removeMutationBatch(t, e);
                        })).next((function() {
                            return n.mutationQueue.performConsistencyCheck(t);
                        })).next((function() {
                            return n.documentOverlayCache.removeOverlaysForBatchId(t, r, e);
                        })).next((function() {
                            return n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, r);
                        })).next((function() {
                            return n.localDocuments.getDocuments(t, r);
                        }));
                    }));
                }(e.localStore, r) ];

              case 2:
                return o = n.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                fa(e, r, i), ha(e, r), e.sharedClientState.updateMutationState(r, "rejected", i), 
                [ 4 /*yield*/ , ga(e, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , At(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */ function la(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, u, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                ps((e = W(t)).remoteStore) || U("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                n.label = 1;

              case 1:
                return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , function(t) {
                    var e = W(t);
                    return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(t) {
                        return e.mutationQueue.getHighestUnacknowledgedBatchId(t);
                    }));
                }(e.localStore) ];

              case 2:
                return -1 === (i = n.sent()) ? [ 2 /*return*/ , void r.resolve() ] : ((o = e.uc.get(i) || []).push(r), 
                e.uc.set(i, o), [ 3 /*break*/ , 4 ]);

              case 3:
                return u = n.sent(), s = Os(u, "Initialization of waitForPendingWrites() operation failed"), 
                r.reject(s), [ 3 /*break*/ , 4 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */ function ha(t, e) {
    (t.uc.get(e) || []).forEach((function(t) {
        t.resolve();
    })), t.uc.delete(e)
    /** Reject all outstanding callbacks waiting for pending writes to complete. */;
}

function fa(t, e, n) {
    var r = W(t), i = r.oc[r.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
    if (i) {
        var o = i.get(e);
        o && (n ? o.reject(n) : o.resolve(), i = i.remove(e)), r.oc[r.currentUser.toKey()] = i;
    }
}

function da(t, e, n) {
    void 0 === n && (n = null), t.sharedClientState.removeLocalQueryTarget(e);
    for (var r = 0, i = t.ec.get(e); r < i.length; r++) {
        var o = i[r];
        t.tc.delete(o), n && t.Zu.lc(o, n);
    }
    t.ec.delete(e), t.isPrimaryClient && t.rc.us(e).forEach((function(e) {
        t.rc.containsKey(e) || 
        // We removed the last reference for this key
        pa(t, e);
    }));
}

function pa(t, e) {
    t.nc.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    var n = t.sc.get(e);
    null !== n && (cs(t.remoteStore, n), t.sc = t.sc.remove(e), t.ic.delete(n), ma(t));
}

function va(t, e, n) {
    for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r];
        o instanceof Ys ? (t.rc.addReference(o.key, e), ya(t, o)) : o instanceof Js ? (U("SyncEngine", "Document no longer in limbo: " + o.key), 
        t.rc.removeReference(o.key, e), t.rc.containsKey(o.key) || 
        // We removed the last reference for this key
        pa(t, o.key)) : j();
    }
}

function ya(t, e) {
    var n = e.key, r = n.path.canonicalString();
    t.sc.get(n) || t.nc.has(r) || (U("SyncEngine", "New document in limbo: " + n), t.nc.add(r), 
    ma(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function ma(t) {
    for (;t.nc.size > 0 && t.sc.size < t.maxConcurrentLimboResolutions; ) {
        var e = t.nc.values().next().value;
        t.nc.delete(e);
        var n = new mt(pt.fromString(e)), r = t.cc.next();
        t.ic.set(r, new Zs(n)), t.sc = t.sc.insert(n, r), as(t.remoteStore, new Fi(dn(an(n.path)), r, 2 /* LimboResolution */ , Kt.ot));
    }
}

function ga(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o, u, s, a;
        return n(this, (function(c) {
            switch (c.label) {
              case 0:
                return o = W(t), u = [], s = [], a = [], o.tc.isEmpty() ? [ 3 /*break*/ , 3 ] : (o.tc.forEach((function(t, e) {
                    a.push(o.hc(e, r, i).then((function(t) {
                        if (t) {
                            o.isPrimaryClient && o.sharedClientState.updateQueryState(e.targetId, t.fromCache ? "not-current" : "current"), 
                            u.push(t);
                            var n = mu.Vi(e.targetId, t);
                            s.push(n);
                        }
                    })));
                })), [ 4 /*yield*/ , Promise.all(a) ]);

              case 1:
                return c.sent(), o.Zu.Go(u), [ 4 /*yield*/ , function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i, o, u, s, a, c, l, h;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                e = W(t), n.label = 1;

                              case 1:
                                return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , e.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(t) {
                                    return kt.forEach(r, (function(n) {
                                        return kt.forEach(n.Pi, (function(r) {
                                            return e.persistence.referenceDelegate.addReference(t, n.targetId, r);
                                        })).next((function() {
                                            return kt.forEach(n.vi, (function(r) {
                                                return e.persistence.referenceDelegate.removeReference(t, n.targetId, r);
                                            }));
                                        }));
                                    }));
                                })) ];

                              case 2:
                                return n.sent(), [ 3 /*break*/ , 4 ];

                              case 3:
                                if (!Rt(i = n.sent())) throw i;
                                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                                // number for the documents that were included in this transaction.
                                // This might trigger them to be deleted earlier than they otherwise
                                // would have, but it should not invalidate the integrity of the data.
                                                                return U("LocalStore", "Failed to update sequence numbers: " + i), 
                                [ 3 /*break*/ , 4 ];

                              case 4:
                                for (o = 0, u = r; o < u.length; o++) s = u[o], a = s.targetId, s.fromCache || (c = e.$i.get(a), 
                                l = c.snapshotVersion, h = c.withLastLimboFreeSnapshotVersion(l), 
                                // Advance the last limbo free snapshot version
                                e.$i = e.$i.insert(a, h));
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(o.localStore, s) ];

              case 2:
                c.sent(), c.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function wa(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return (e = W(t)).currentUser.isEqual(r) ? [ 3 /*break*/ , 3 ] : (U("SyncEngine", "User change. New user:", r.toKey()), 
                [ 4 /*yield*/ , Iu(e.localStore, r) ]);

              case 1:
                return i = n.sent(), e.currentUser = r, 
                // Fails tasks waiting for pending writes requested by previous user.
                function(t, e) {
                    t.uc.forEach((function(t) {
                        t.forEach((function(t) {
                            t.reject(new Y(H.CANCELLED, "'waitForPendingWrites' promise is rejected due to a user change."));
                        }));
                    })), t.uc.clear();
                }(e), 
                // TODO(b/114226417): Consider calling this only in the primary tab.
                e.sharedClientState.handleUserChange(r, i.removedBatchIds, i.addedBatchIds), [ 4 /*yield*/ , ga(e, i.Ki) ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function ba(t, e) {
    var n = W(t), r = n.ic.get(e);
    if (r && r.Xu) return yr().add(r.key);
    var i = yr(), o = n.ec.get(e);
    if (!o) return i;
    for (var u = 0, s = o; u < s.length; u++) {
        var a = s[u], c = n.tc.get(a);
        i = i.unionWith(c.view.qu);
    }
    return i;
}

/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */ function Ia(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , Au((e = W(t)).localStore, r.query, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return i = n.sent(), o = r.view.Ju(i), [ 2 /*return*/ , (e.isPrimaryClient && va(e, r.targetId, o.zu), 
                o) ];
            }
        }));
    }));
}

/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
// PORTING NOTE: Multi-Tab only.
function Ea(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            return [ 2 /*return*/ , Cu((e = W(t)).localStore, r).then((function(t) {
                return ga(e, t);
            })) ];
        }));
    }));
}

/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
function Ta(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , function(t, e) {
                    var n = W(t), r = W(n.mutationQueue);
                    return n.persistence.runTransaction("Lookup mutation documents", "readonly", (function(t) {
                        return r.yn(t, e).next((function(e) {
                            return e ? n.localDocuments.getDocuments(t, e) : kt.resolve(null);
                        }));
                    }));
                }((e = W(t)).localStore, r) ];

              case 1:
                return null === (u = n.sent()) ? [ 3 /*break*/ , 6 ] : "pending" !== i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , Is(e.remoteStore) ];

              case 2:
                // If we are the primary client, we need to send this write to the
                // backend. Secondary clients will ignore these writes since their remote
                // connection is disabled.
                return n.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                "acknowledged" === i || "rejected" === i ? (
                // NOTE: Both these methods are no-ops for batches that originated from
                // other clients.
                fa(e, r, o || null), ha(e, r), function(t, e) {
                    W(W(t).mutationQueue).In(e);
                }(e.localStore, r)) : j(), n.label = 4;

              case 4:
                return [ 4 /*yield*/ , ga(e, u) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 7 ];

              case 6:
                // A throttled tab may not have seen the mutation before it was completed
                // and removed from the mutation queue, in which case we won't have cached
                // the affected documents. In this case we can safely ignore the update
                // since that means we didn't apply the mutation locally at all (if we
                // had, we would have cached the affected documents), and so we will just
                // see any resulting document changes via normal remote document updates
                // as applicable.
                U("SyncEngine", "Cannot apply mutation batch with id: " + r), n.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function Sa(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, u, s, a, c, l;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return ka(e = W(t)), Ca(e), !0 !== r || !0 === e.ac ? [ 3 /*break*/ , 3 ] : (i = e.sharedClientState.getAllActiveQueryTargets(), 
                [ 4 /*yield*/ , Da(e, i.toArray()) ]);

              case 1:
                return o = n.sent(), e.ac = !0, [ 4 /*yield*/ , As(e.remoteStore, !0) ];

              case 2:
                for (n.sent(), u = 0, s = o; u < s.length; u++) a = s[u], as(e.remoteStore, a);
                return [ 3 /*break*/ , 7 ];

              case 3:
                return !1 !== r || !1 === e.ac ? [ 3 /*break*/ , 7 ] : (c = [], l = Promise.resolve(), 
                e.ec.forEach((function(t, n) {
                    e.sharedClientState.isLocalQueryTarget(n) ? c.push(n) : l = l.then((function() {
                        return da(e, n), Nu(e.localStore, n, 
                        /*keepPersistedTargetData=*/ !0);
                    })), cs(e.remoteStore, n);
                })), [ 4 /*yield*/ , l ]);

              case 4:
                return n.sent(), [ 4 /*yield*/ , Da(e, c) ];

              case 5:
                return n.sent(), 
                // PORTING NOTE: Multi-Tab only.
                function(t) {
                    var e = W(t);
                    e.ic.forEach((function(t, n) {
                        cs(e.remoteStore, n);
                    })), e.rc.cs(), e.ic = new Map, e.sc = new Qt(mt.comparator);
                }(e), e.ac = !1, [ 4 /*yield*/ , As(e.remoteStore, !1) ];

              case 6:
                n.sent(), n.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Da(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, u, s, a, c, l, h, f, d, p, v, y;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = W(t), i = [], o = [], u = 0, s = r, n.label = 1;

              case 1:
                return u < s.length ? (a = s[u], c = void 0, (l = e.ec.get(a)) && 0 !== l.length ? [ 4 /*yield*/ , xu(e.localStore, dn(l[0])) ] : [ 3 /*break*/ , 7 ]) : [ 3 /*break*/ , 13 ];

              case 2:
                // For queries that have a local View, we fetch their current state
                // from LocalStore (as the resume token and the snapshot version
                // might have changed) and reconcile their views with the persisted
                // state (the list of syncedDocuments may have gotten out of sync).
                c = n.sent(), h = 0, f = l, n.label = 3;

              case 3:
                return h < f.length ? (d = f[h], p = e.tc.get(d), [ 4 /*yield*/ , Ia(e, p) ]) : [ 3 /*break*/ , 6 ];

              case 4:
                (v = n.sent()).snapshot && o.push(v.snapshot), n.label = 5;

              case 5:
                return h++, [ 3 /*break*/ , 3 ];

              case 6:
                return [ 3 /*break*/ , 11 ];

              case 7:
                return [ 4 /*yield*/ , ku(e.localStore, a) ];

              case 8:
                return y = n.sent(), [ 4 /*yield*/ , xu(e.localStore, y) ];

              case 9:
                return c = n.sent(), [ 4 /*yield*/ , na(e, _a(y), a, 
                /*current=*/ !1) ];

              case 10:
                n.sent(), n.label = 11;

              case 11:
                i.push(c), n.label = 12;

              case 12:
                return u++, [ 3 /*break*/ , 1 ];

              case 13:
                return [ 2 /*return*/ , (e.Zu.Go(o), i) ];
            }
        }));
    }));
}

/**
 * Creates a `Query` object from the specified `Target`. There is no way to
 * obtain the original `Query`, so we synthesize a `Query` from the `Target`
 * object.
 *
 * The synthesized result might be different from the original `Query`, but
 * since the synthesized `Query` should return the same results as the
 * original one (only the presentation of results might differ), the potential
 * difference will not cause issues.
 */
// PORTING NOTE: Multi-Tab only.
function _a(t) {
    return sn(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
}

/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function xa(t) {
    var e = W(t);
    return W(W(e.localStore).persistence).Ri();
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function Na(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, u, s, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if ((e = W(t)).ac) 
                // If we receive a target state notification via WebStorage, we are
                // either already secondary or another tab has taken the primary lease.
                return [ 2 /*return*/ , void U("SyncEngine", "Ignoring unexpected query state notification.") ];
                if (!((u = e.ec.get(r)) && u.length > 0)) return [ 3 /*break*/ , 7 ];
                switch (i) {
                  case "current":
                  case "not-current":
                    return [ 3 /*break*/ , 1 ];

                  case "rejected":
                    return [ 3 /*break*/ , 4 ];
                }
                return [ 3 /*break*/ , 6 ];

              case 1:
                return [ 4 /*yield*/ , Cu(e.localStore, wn(u[0])) ];

              case 2:
                return s = n.sent(), a = wr.createSynthesizedRemoteEventForCurrentChange(r, "current" === i), 
                [ 4 /*yield*/ , ga(e, s, a) ];

              case 3:
                return n.sent(), [ 3 /*break*/ , 7 ];

              case 4:
                return [ 4 /*yield*/ , Nu(e.localStore, r, 
                /* keepPersistedTargetData */ !0) ];

              case 5:
                return n.sent(), da(e, r, o), [ 3 /*break*/ , 7 ];

              case 6:
                j(), n.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Adds or removes Watch targets for queries from different tabs. */ function Aa(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, u, s, a, c, l, h, f, d;
        return n(this, (function(p) {
            switch (p.label) {
              case 0:
                if (!(e = ka(t)).ac) return [ 3 /*break*/ , 10 ];
                o = 0, u = r, p.label = 1;

              case 1:
                return o < u.length ? (s = u[o], e.ec.has(s) ? (
                // A target might have been added in a previous attempt
                U("SyncEngine", "Adding an already active target " + s), [ 3 /*break*/ , 5 ]) : [ 4 /*yield*/ , ku(e.localStore, s) ]) : [ 3 /*break*/ , 6 ];

              case 2:
                return a = p.sent(), [ 4 /*yield*/ , xu(e.localStore, a) ];

              case 3:
                return c = p.sent(), [ 4 /*yield*/ , na(e, _a(a), c.targetId, 
                /*current=*/ !1) ];

              case 4:
                p.sent(), as(e.remoteStore, c), p.label = 5;

              case 5:
                return o++, [ 3 /*break*/ , 1 ];

              case 6:
                l = function(t) {
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e.ec.has(t) ? [ 4 /*yield*/ , Nu(e.localStore, t, 
                            /* keepPersistedTargetData */ !1).then((function() {
                                cs(e.remoteStore, t), da(e, t);
                            })).catch(At) ] : [ 3 /*break*/ , 2 ];

                            // Release queries that are still active.
                                                      case 1:
                            // Release queries that are still active.
                            n.sent(), n.label = 2;

                          case 2:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }, h = 0, f = i, p.label = 7;

              case 7:
                return h < f.length ? (d = f[h], [ 5 /*yield**/ , l(d) ]) : [ 3 /*break*/ , 10 ];

              case 8:
                p.sent(), p.label = 9;

              case 9:
                return h++, [ 3 /*break*/ , 7 ];

              case 10:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function ka(t) {
    var e = W(t);
    return e.remoteStore.remoteSyncer.applyRemoteEvent = oa.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = ba.bind(null, e), 
    e.remoteStore.remoteSyncer.rejectListen = sa.bind(null, e), e.Zu.Go = Bs.bind(null, e.eventManager), 
    e.Zu.lc = Ks.bind(null, e.eventManager), e;
}

function Ca(t) {
    var e = W(t);
    return e.remoteStore.remoteSyncer.applySuccessfulWrite = aa.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = ca.bind(null, e), 
    e
    /**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */;
}

function Va(t, r, i) {
    var o = W(t);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
        /** Loads a bundle and returns the list of affected collection groups. */
    (function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e, o, u, s, a, c;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([ 0, 14, , 15 ]), [ 4 /*yield*/ , r.getMetadata() ];

                  case 1:
                    return e = n.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = W(t), r = Mr(e.createTime);
                        return n.persistence.runTransaction("hasNewerBundle", "readonly", (function(t) {
                            return n.Ds.getBundleMetadata(t, e.id);
                        })).then((function(t) {
                            return !!t && t.createTime.compareTo(r) >= 0;
                        }));
                    }(t.localStore, e) ];

                  case 2:
                    return n.sent() ? [ 4 /*yield*/ , r.close() ] : [ 3 /*break*/ , 4 ];

                  case 3:
                    return [ 2 /*return*/ , (n.sent(), i._completeWith(function(t) {
                        return {
                            taskState: "Success",
                            documentsLoaded: t.totalDocuments,
                            bytesLoaded: t.totalBytes,
                            totalDocuments: t.totalDocuments,
                            totalBytes: t.totalBytes
                        };
                    }(e)), Promise.resolve(new Set)) ];

                  case 4:
                    return i._updateProgress(Hs(e)), o = new Ws(e, t.localStore, r.wt), [ 4 /*yield*/ , r.fc() ];

                  case 5:
                    u = n.sent(), n.label = 6;

                  case 6:
                    return u ? [ 4 /*yield*/ , o.Nu(u) ] : [ 3 /*break*/ , 10 ];

                  case 7:
                    return (s = n.sent()) && i._updateProgress(s), [ 4 /*yield*/ , r.fc() ];

                  case 8:
                    u = n.sent(), n.label = 9;

                  case 9:
                    return [ 3 /*break*/ , 6 ];

                  case 10:
                    return [ 4 /*yield*/ , o.complete() ];

                  case 11:
                    return a = n.sent(), [ 4 /*yield*/ , ga(t, a.Mu, 
                    /* remoteEvent */ void 0) ];

                  case 12:
                    // Save metadata, so loading the same bundle will skip.
                    return n.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = W(t);
                        return n.persistence.runTransaction("Save bundle", "readwrite", (function(t) {
                            return n.Ds.saveBundleMetadata(t, e);
                        }));
                    }(t.localStore, e) ];

                  case 13:
                    return [ 2 /*return*/ , (
                    // Save metadata, so loading the same bundle will skip.
                    n.sent(), i._completeWith(a.progress), Promise.resolve(a.Ou)) ];

                  case 14:
                    return [ 2 /*return*/ , (K("SyncEngine", "Loading bundle failed with " + (c = n.sent())), 
                    i._failWith(c), Promise.resolve(new Set)) ];

                  case 15:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */)(o, r, i).then((function(t) {
        o.sharedClientState.notifyBundleLoaded(t);
    }));
}

var Oa = /** @class */ function() {
    function t() {
        this.synchronizeTabs = !1;
    }
    return t.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.wt = $u(t.databaseInfo.databaseId), this.sharedClientState = this.dc(t), 
                    this.persistence = this._c(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this.localStore = this.wc(t), this.gcScheduler = this.mc(t, this.localStore), 
                    this.indexBackfillerScheduler = this.gc(t, this.localStore), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.mc = function(t, e) {
        return null;
    }, t.prototype.gc = function(t, e) {
        return null;
    }, t.prototype.wc = function(t) {
        return bu(this.persistence, new gu, t.initialUser, this.wt);
    }, t.prototype._c = function(t) {
        return new su(cu.Ms, this.wt);
    }, t.prototype.dc = function(t) {
        return new ju;
    }, t.prototype.terminate = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.gcScheduler && this.gcScheduler.stop(), [ 4 /*yield*/ , this.sharedClientState.shutdown() ];

                  case 1:
                    return t.sent(), [ 4 /*yield*/ , this.persistence.shutdown() ];

                  case 2:
                    return t.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}(), Ma = /** @class */ function(r) {
    function i(t, e, n) {
        var i = this;
        return (i = r.call(this) || this).yc = t, i.cacheSizeBytes = e, i.forceOwnership = n, 
        i.synchronizeTabs = !1, i;
    }
    return t(i, r), i.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , r.prototype.initialize.call(this, t) ];

                  case 1:
                    return n.sent(), [ 4 /*yield*/ , this.yc.initialize(this, t) ];

                  case 2:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , Ca(this.yc.syncEngine) ];

                  case 3:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , Is(this.yc.remoteStore) ];

                  case 4:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return n.sent(), [ 4 /*yield*/ , this.persistence.ci((function() {
                        return e.gcScheduler && !e.gcScheduler.started && e.gcScheduler.start(), e.indexBackfillerScheduler && !e.indexBackfillerScheduler.started && e.indexBackfillerScheduler.start(), 
                        Promise.resolve();
                    })) ];

                  case 5:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.wc = function(t) {
        return bu(this.persistence, new gu, t.initialUser, this.wt);
    }, i.prototype.mc = function(t, e) {
        var n = this.persistence.referenceDelegate.garbageCollector;
        return new Po(n, t.asyncQueue, e);
    }, i.prototype.gc = function(t, e) {
        var n = new Bt(e, this.persistence);
        return new Ut(t.asyncQueue, n);
    }, i.prototype._c = function(t) {
        var e = yu(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? To.withCacheSize(this.cacheSizeBytes) : To.DEFAULT;
        return new du(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, Ju(), Xu(), this.wt, this.sharedClientState, !!this.forceOwnership);
    }, i.prototype.dc = function(t) {
        return new ju;
    }, i;
}(Oa), Ra = /** @class */ function(r) {
    function i(t, e) {
        var n = this;
        return (n = r.call(this, t, e, /* forceOwnership= */ !1) || this).yc = t, n.cacheSizeBytes = e, 
        n.synchronizeTabs = !0, n;
    }
    return t(i, r), i.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            var i, o = this;
            return n(this, (function(u) {
                switch (u.label) {
                  case 0:
                    return [ 4 /*yield*/ , r.prototype.initialize.call(this, t) ];

                  case 1:
                    return u.sent(), i = this.yc.syncEngine, this.sharedClientState instanceof Gu ? (this.sharedClientState.syncEngine = {
                        kr: Ta.bind(null, i),
                        Or: Na.bind(null, i),
                        Mr: Aa.bind(null, i),
                        Ri: xa.bind(null, i),
                        Nr: Ea.bind(null, i)
                    }, [ 4 /*yield*/ , this.sharedClientState.start() ]) : [ 3 /*break*/ , 3 ];

                  case 2:
                    u.sent(), u.label = 3;

                  case 3:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return [ 4 /*yield*/ , this.persistence.ci((function(t) {
                        return e(o, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , Sa(this.yc.syncEngine, t) ];

                                  case 1:
                                    return e.sent(), this.gcScheduler && (t && !this.gcScheduler.started ? this.gcScheduler.start() : t || this.gcScheduler.stop()), 
                                    this.indexBackfillerScheduler && (t && !this.indexBackfillerScheduler.started ? this.indexBackfillerScheduler.start() : t || this.indexBackfillerScheduler.stop()), 
                                    [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 4:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return u.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.dc = function(t) {
        var e = Ju();
        if (!Gu.V(e)) throw new Y(H.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        var n = yu(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new Gu(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }, i;
}(Ma), La = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.localStore ? [ 3 /*break*/ , 2 ] : (this.localStore = t.localStore, 
                    this.sharedClientState = t.sharedClientState, this.datastore = this.createDatastore(r), 
                    this.remoteStore = this.createRemoteStore(r), this.eventManager = this.createEventManager(r), 
                    this.syncEngine = this.createSyncEngine(r, 
                    /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = function(t) {
                        return ua(e.syncEngine, t, 1 /* SharedClientState */);
                    }, this.remoteStore.remoteSyncer.handleCredentialChange = wa.bind(null, this.syncEngine), 
                    [ 4 /*yield*/ , As(this.remoteStore, this.syncEngine.isPrimaryClient) ]);

                  case 1:
                    n.sent(), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.createEventManager = function(t) {
        return new Ps;
    }, t.prototype.createDatastore = function(t) {
        var e, n = $u(t.databaseInfo.databaseId), r = (e = t.databaseInfo, new Yu(e));
        /** Return the Platform-specific connectivity monitor. */ return function(t, e, n, r) {
            return new rs(t, e, n, r);
        }(t.authCredentials, t.appCheckCredentials, r, n);
    }, t.prototype.createRemoteStore = function(t) {
        var e, n, r, i, o, u = this;
        return e = this.localStore, n = this.datastore, r = t.asyncQueue, i = function(t) {
            return ua(u.syncEngine, t, 0 /* RemoteStore */);
        }, o = Qu.V() ? new Qu : new zu, new os(e, n, r, i, o);
    }, t.prototype.createSyncEngine = function(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        r, i, o, u) {
            var s = new ta(t, e, n, r, i, o);
            return u && (s.ac = !0), s;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }, t.prototype.terminate = function() {
        return function(t) {
            return e(this, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = W(t), U("RemoteStore", "RemoteStore shutting down."), e.lu.add(5 /* Shutdown */), 
                        [ 4 /*yield*/ , ss(e) ];

                      case 1:
                        return n.sent(), e.du.shutdown(), 
                        // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                        // triggering spurious listener events with cached data, etc.
                        e._u.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
                    }
                }));
            }));
        }(this.remoteStore);
    }, t;
}();

/**
 * Provides all components needed for Firestore with IndexedDB persistence.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * How many bytes to read each time when `ReadableStreamReader.read()` is
 * called. Only applicable for byte streams that we control (e.g. those backed
 * by an UInt8Array).
 */
/**
 * Builds a `ByteStreamReader` from a UInt8Array.
 * @param source - The data source to use.
 * @param bytesPerRead - How many bytes each `read()` from the returned reader
 *        will read.
 */
function Fa(t, r) {
    void 0 === r && (r = 10240);
    var i = 0;
    // The TypeScript definition for ReadableStreamReader changed. We use
    // `any` here to allow this code to compile with different versions.
    // See https://github.com/microsoft/TypeScript/issues/42970
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        read: function() {
            return e(this, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    return i < t.byteLength ? (e = {
                        value: t.slice(i, i + r),
                        done: !1
                    }, [ 2 /*return*/ , (i += r, e) ]) : [ 2 /*return*/ , {
                        done: !0
                    } ];
                }));
            }));
        },
        cancel: function() {
            return e(this, void 0, void 0, (function() {
                return n(this, (function(t) {
                    return [ 2 /*return*/ ];
                }));
            }));
        },
        releaseLock: function() {},
        closed: Promise.reject("unimplemented")
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */ var Pa = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.observer.next && this.Ic(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.observer.error ? this.Ic(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
    }, t.prototype.Tc = function() {
        this.muted = !0;
    }, t.prototype.Ic = function(t, e) {
        var n = this;
        this.muted || setTimeout((function() {
            n.muted || t(e);
        }), 0);
    }, t;
}(), qa = /** @class */ function() {
    function t(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        var n = this;
        this.Ec = t, this.wt = e, 
        /** Cached bundle metadata. */
        this.metadata = new J, 
        /**
             * Internal buffer to hold bundle content, accumulating incomplete element
             * content.
             */
        this.buffer = new Uint8Array, this.Ac = new TextDecoder("utf-8"), 
        // Read the metadata (which is the first element).
        this.Rc().then((function(t) {
            t && t.Cu() ? n.metadata.resolve(t.payload.metadata) : n.metadata.reject(new Error("The first element of the bundle is not a metadata, it is\n             " + JSON.stringify(null == t ? void 0 : t.payload)));
        }), (function(t) {
            return n.metadata.reject(t);
        }));
    }
    return t.prototype.close = function() {
        return this.Ec.cancel();
    }, t.prototype.getMetadata = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return [ 2 /*return*/ , this.metadata.promise ];
            }));
        }));
    }, t.prototype.fc = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.getMetadata() ];

                  case 1:
                    // Makes sure metadata is read before proceeding.
                    return [ 2 /*return*/ , (t.sent(), this.Rc()) ];
                }
            }));
        }));
    }, 
    /**
     * Reads from the head of internal buffer, and pulling more data from
     * underlying stream if a complete element cannot be found, until an
     * element(including the prefixed length and the JSON string) is found.
     *
     * Once a complete element is read, it is dropped from internal buffer.
     *
     * Returns either the bundled element, or null if we have reached the end of
     * the stream.
     */
    t.prototype.Rc = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.bc() ];

                  case 1:
                    return null === (t = n.sent()) ? [ 2 /*return*/ , null ] : (e = this.Ac.decode(t), 
                    r = Number(e), isNaN(r) && this.Pc("length string (" + e + ") is not valid number"), 
                    [ 4 /*yield*/ , this.vc(r) ]);

                  case 2:
                    return i = n.sent(), [ 2 /*return*/ , new zs(JSON.parse(i), t.length + r) ];
                }
            }));
        }));
    }, 
    /** First index of '{' from the underlying buffer. */ t.prototype.Vc = function() {
        return this.buffer.findIndex((function(t) {
            return t === "{".charCodeAt(0);
        }));
    }, 
    /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */
    t.prototype.bc = function() {
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.Vc() < 0 ? [ 4 /*yield*/ , this.Sc() ] : [ 3 /*break*/ , 3 ];

                  case 1:
                    if (n.sent()) return [ 3 /*break*/ , 3 ];
                    n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 0 ];

                  case 3:
                    // Broke out of the loop because underlying stream is closed, and there
                    // happens to be no more data to process.
                    return 0 === this.buffer.length ? [ 2 /*return*/ , null ] : (
                    // Broke out of the loop because underlying stream is closed, but still
                    // cannot find an open bracket.
                    (t = this.Vc()) < 0 && this.Pc("Reached the end of bundle when a length string is expected."), 
                    e = this.buffer.slice(0, t), [ 2 /*return*/ , (this.buffer = this.buffer.slice(t), 
                    e) ]);
                }
            }));
        }));
    }, 
    /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */
    t.prototype.vc = function(t) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.buffer.length < t ? [ 4 /*yield*/ , this.Sc() ] : [ 3 /*break*/ , 3 ];

                  case 1:
                    n.sent() && this.Pc("Reached the end of bundle when more is expected."), n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 0 ];

                  case 3:
                    // Update the internal buffer to drop the read json string.
                    return e = this.Ac.decode(this.buffer.slice(0, t)), [ 2 /*return*/ , (this.buffer = this.buffer.slice(t), 
                    e) ];
                }
            }));
        }));
    }, t.prototype.Pc = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        throw this.Ec.cancel(), new Error("Invalid bundle format: " + t);
    }, 
    /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */
    t.prototype.Sc = function() {
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Ec.read() ];

                  case 1:
                    return (t = n.sent()).done || ((e = new Uint8Array(this.buffer.length + t.value.length)).set(this.buffer), 
                    e.set(t.value, this.buffer.length), this.buffer = e), [ 2 /*return*/ , t.done ];
                }
            }));
        }));
    }, t;
}(), Ua = /** @class */ function() {
    function t(t) {
        this.datastore = t, 
        // The version of each document that was read during this transaction.
        this.readVersions = new Map, this.mutations = [], this.committed = !1, 
        /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
        this.lastWriteError = null, 
        /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
        this.writtenDocs = new Set;
    }
    return t.prototype.lookup = function(t) {
        return e(this, void 0, void 0, (function() {
            var r, i = this;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new Y(H.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o, u, s, a;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = W(t), i = Br(e.wt) + "/documents", o = {
                                        documents: r.map((function(t) {
                                            return Fr(e.wt, t);
                                        }))
                                    }, [ 4 /*yield*/ , e.ao("BatchGetDocuments", i, o) ];

                                  case 1:
                                    return u = n.sent(), s = new Map, u.forEach((function(t) {
                                        var n = function(t, e) {
                                            return "found" in e ? function(t, e) {
                                                z(!!e.found), e.found.name, e.found.updateTime;
                                                var n = Pr(t, e.found.name), r = Mr(e.found.updateTime), i = new Me({
                                                    mapValue: {
                                                        fields: e.found.fields
                                                    }
                                                });
                                                return Le.newFoundDocument(n, r, i);
                                            }(t, e) : "missing" in e ? function(t, e) {
                                                z(!!e.missing), z(!!e.readTime);
                                                var n = Pr(t, e.missing), r = Mr(e.readTime);
                                                return Le.newNoDocument(n, r);
                                            }(t, e) : j();
                                        }(e.wt, t);
                                        s.set(n.key.toString(), n);
                                    })), a = [], [ 2 /*return*/ , (r.forEach((function(t) {
                                        var e = s.get(t.toString());
                                        z(!!e), a.push(e);
                                    })), a) ];
                                }
                            }));
                        }));
                    }(this.datastore, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((r = o.sent()).forEach((function(t) {
                        return i.recordVersion(t);
                    })), r) ];
                }
            }));
        }));
    }, t.prototype.set = function(t, e) {
        this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.update = function(t, e) {
        try {
            this.write(e.toMutation(t, this.preconditionForUpdate(t)));
        } catch (t) {
            this.lastWriteError = t;
        }
        this.writtenDocs.add(t.toString());
    }, t.prototype.delete = function(t) {
        this.write(new tr(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.commit = function() {
        return e(this, void 0, void 0, (function() {
            var t, r = this;
            return n(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
                    return t = this.readVersions, 
                    // For each mutation, note that the doc was written.
                    this.mutations.forEach((function(e) {
                        t.delete(e.key.toString());
                    })), 
                    // For each document that was read but not written to, we want to perform
                    // a `verify` operation.
                    t.forEach((function(t, e) {
                        var n = mt.fromPath(e);
                        r.mutations.push(new er(n, r.precondition(n)));
                    })), [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = W(t), i = Br(e.wt) + "/documents", o = {
                                        writes: r.map((function(t) {
                                            return zr(e.wt, t);
                                        }))
                                    }, [ 4 /*yield*/ , e.ro("Commit", i, o) ];

                                  case 1:
                                    return n.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(this.datastore, this.mutations) ];

                  case 1:
                    // For each mutation, note that the doc was written.
                    return i.sent(), this.committed = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.recordVersion = function(t) {
        var e;
        if (t.isFoundDocument()) e = t.version; else {
            if (!t.isNoDocument()) throw j();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = ft.min();
        }
        var n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new Y(H.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.precondition = function(t) {
        var e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? qn.updateTime(e) : qn.none();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.preconditionForUpdate = function(t) {
        var e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(ft.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new Y(H.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return qn.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return qn.exists(!0);
    }, t.prototype.write = function(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }, t.prototype.ensureCommitNotCalled = function() {}, t;
}(), Ba = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.datastore = e, this.options = n, this.updateFunction = r, 
        this.deferred = i, this.Dc = n.maxAttempts, this.So = new Zu(this.asyncQueue, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.run = function() {
        this.Dc -= 1, this.Cc();
    }, t.prototype.Cc = function() {
        var t = this;
        this.So.Io((function() {
            return e(t, void 0, void 0, (function() {
                var t, e, r = this;
                return n(this, (function(n) {
                    return t = new Ua(this.datastore), (e = this.xc(t)) && e.then((function(e) {
                        r.asyncQueue.enqueueAndForget((function() {
                            return t.commit().then((function() {
                                r.deferred.resolve(e);
                            })).catch((function(t) {
                                r.Nc(t);
                            }));
                        }));
                    })).catch((function(t) {
                        r.Nc(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.xc = function(t) {
        try {
            var e = this.updateFunction(t);
            return !le(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.deferred.reject(t), null;
        }
    }, t.prototype.Nc = function(t) {
        var e = this;
        this.Dc > 0 && this.kc(t) ? (this.Dc -= 1, this.asyncQueue.enqueueAndForget((function() {
            return e.Cc(), Promise.resolve();
        }))) : this.deferred.reject(t);
    }, t.prototype.kc = function(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var e = t.code;
            return "aborted" === e || "failed-precondition" === e || !rr(e);
        }
        return !1;
    }, t;
}(), Ka = /** @class */ function() {
    function t(t, r, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    i, o) {
        var u = this;
        this.authCredentials = t, this.appCheckCredentials = r, this.asyncQueue = i, this.databaseInfo = o, 
        this.user = R.UNAUTHENTICATED, this.clientId = st.I(), this.authCredentialListener = function() {
            return Promise.resolve();
        }, this.appCheckCredentialListener = function() {
            return Promise.resolve();
        }, this.authCredentials.start(i, (function(t) {
            return e(u, void 0, void 0, (function() {
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return U("FirestoreClient", "Received user=", t.uid), [ 4 /*yield*/ , this.authCredentialListener(t) ];

                      case 1:
                        return e.sent(), this.user = t, [ 2 /*return*/ ];
                    }
                }));
            }));
        })), this.appCheckCredentials.start(i, (function(t) {
            return U("FirestoreClient", "Received new app check token=", t), u.appCheckCredentialListener(t, u.user);
        }));
    }
    return t.prototype.getConfiguration = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return [ 2 /*return*/ , {
                    asyncQueue: this.asyncQueue,
                    databaseInfo: this.databaseInfo,
                    clientId: this.clientId,
                    authCredentials: this.authCredentials,
                    appCheckCredentials: this.appCheckCredentials,
                    initialUser: this.user,
                    maxConcurrentLimboResolutions: 100
                } ];
            }));
        }));
    }, t.prototype.setCredentialChangeListener = function(t) {
        this.authCredentialListener = t;
    }, t.prototype.setAppCheckTokenChangeListener = function(t) {
        this.appCheckCredentialListener = t;
    }, 
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    t.prototype.verifyNotTerminated = function() {
        if (this.asyncQueue.isShuttingDown) throw new Y(H.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.terminate = function() {
        var t = this;
        this.asyncQueue.enterRestrictedMode();
        var r = new J;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((function() {
            return e(t, void 0, void 0, (function() {
                var t, e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return n.trys.push([ 0, 5, , 6 ]), this.onlineComponents ? [ 4 /*yield*/ , this.onlineComponents.terminate() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        n.sent(), n.label = 2;

                      case 2:
                        return this.offlineComponents ? [ 4 /*yield*/ , this.offlineComponents.terminate() ] : [ 3 /*break*/ , 4 ];

                      case 3:
                        n.sent(), n.label = 4;

                      case 4:
                        // The credentials provider must be terminated after shutting down the
                        // RemoteStore as it will prevent the RemoteStore from retrieving auth
                        // tokens.
                        return this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), r.resolve(), 
                        [ 3 /*break*/ , 6 ];

                      case 5:
                        return t = n.sent(), e = Os(t, "Failed to shutdown persistence"), r.reject(e), [ 3 /*break*/ , 6 ];

                      case 6:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })), r.promise;
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A class representing a bundle.
 *
 * Takes a bundle stream or buffer, and presents abstractions to read bundled
 * elements out of the underlying content.
 */ function Ga(t, r) {
    return e(this, void 0, void 0, (function() {
        var i, o, u = this;
        return n(this, (function(s) {
            switch (s.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), U("FirestoreClient", "Initializing OfflineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 1:
                return i = s.sent(), [ 4 /*yield*/ , r.initialize(i) ];

              case 2:
                return s.sent(), o = i.initialUser, t.setCredentialChangeListener((function(t) {
                    return e(u, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return o.isEqual(t) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , Iu(r.localStore, t) ];

                              case 1:
                                e.sent(), o = t, e.label = 2;

                              case 2:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), 
                // When a user calls clearPersistence() in one client, all other clients
                // need to be terminated to allow the delete to succeed.
                r.persistence.setDatabaseDeletedListener((function() {
                    return t.terminate();
                })), t.offlineComponents = r, [ 2 /*return*/ ];
            }
        }));
    }));
}

function ja(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), [ 4 /*yield*/ , za(t) ];

              case 1:
                return e = n.sent(), U("FirestoreClient", "Initializing OnlineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 2:
                return i = n.sent(), [ 4 /*yield*/ , r.initialize(e, i) ];

              case 3:
                return n.sent(), 
                // The CredentialChangeListener of the online component provider takes
                // precedence over the offline component provider.
                t.setCredentialChangeListener((function(t) {
                    return Ns(r.remoteStore, t);
                })), t.setAppCheckTokenChangeListener((function(t, e) {
                    return Ns(r.remoteStore, e);
                })), t.onlineComponents = r, [ 2 /*return*/ ];
            }
        }));
    }));
}

function za(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.offlineComponents ? [ 3 /*break*/ , 2 ] : (U("FirestoreClient", "Using default OfflineComponentProvider"), 
                [ 4 /*yield*/ , Ga(t, new Oa) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.offlineComponents ];
            }
        }));
    }));
}

function Qa(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.onlineComponents ? [ 3 /*break*/ , 2 ] : (U("FirestoreClient", "Using default OnlineComponentProvider"), 
                [ 4 /*yield*/ , ja(t, new La) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.onlineComponents ];
            }
        }));
    }));
}

function Wa(t) {
    return za(t).then((function(t) {
        return t.persistence;
    }));
}

function Ha(t) {
    return za(t).then((function(t) {
        return t.localStore;
    }));
}

function Ya(t) {
    return Qa(t).then((function(t) {
        return t.remoteStore;
    }));
}

function Ja(t) {
    return Qa(t).then((function(t) {
        return t.syncEngine;
    }));
}

function Xa(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , Qa(t) ];

              case 1:
                return e = n.sent(), [ 2 /*return*/ , ((r = e.eventManager).onListen = ea.bind(null, e.syncEngine), 
                r.onUnlisten = ra.bind(null, e.syncEngine), r) ];
            }
        }));
    }));
}

/** Enables the network connection and re-enqueues all pending operations. */ function $a(t, r, i) {
    var o = this;
    void 0 === i && (i = {});
    var u = new J;
    return t.asyncQueue.enqueueAndForget((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = function(t, e, n, r, i) {
                        var o = new Pa({
                            next: function(o) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return Us(t, u);
                                }));
                                var s = o.docs.has(n);
                                !s && o.fromCache ? 
                                // TODO(dimond): If we're online and the document doesn't
                                // exist then we resolve with a doc.exists set to false. If
                                // we're offline however, we reject the Promise in this
                                // case. Two options: 1) Cache the negative response from
                                // the server so we can deliver that even when you're
                                // offline 2) Actually reject the Promise in the online case
                                // if the document doesn't exist.
                                i.reject(new Y(H.UNAVAILABLE, "Failed to get document because the client is offline.")) : s && o.fromCache && r && "server" === r.source ? i.reject(new Y(H.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(o);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), u = new js(an(n.path), o, {
                            includeMetadataChanges: !0,
                            Du: !0
                        });
                        return qs(t, u);
                    }, [ 4 /*yield*/ , Xa(t) ];

                  case 1:
                    return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), t.asyncQueue, r, i, u ]) ];
                }
            }));
        }));
    })), u.promise;
}

function Za(t, r, i) {
    var o = this;
    void 0 === i && (i = {});
    var u = new J;
    return t.asyncQueue.enqueueAndForget((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = function(t, e, n, r, i) {
                        var o = new Pa({
                            next: function(n) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return Us(t, u);
                                })), n.fromCache && "server" === r.source ? i.reject(new Y(H.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), u = new js(n, o, {
                            includeMetadataChanges: !0,
                            Du: !0
                        });
                        return qs(t, u);
                    }, [ 4 /*yield*/ , Xa(t) ];

                  case 1:
                    return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), t.asyncQueue, r, i, u ]) ];
                }
            }));
        }));
    })), u.promise;
}

var tc = new Map;

/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ec(t, e, n) {
    if (!n) throw new Y(H.INVALID_ARGUMENT, "Function " + t + "() cannot be called with an empty " + e + ".");
}

/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */ function nc(t, e, n, r) {
    if (!0 === e && !0 === r) throw new Y(H.INVALID_ARGUMENT, t + " and " + n + " cannot be used together.");
}

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function rc(t) {
    if (!mt.isDocumentKey(t)) throw new Y(H.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function ic(t) {
    if (mt.isDocumentKey(t)) throw new Y(H.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */ function oc(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        var e = 
        /** try to get the constructor name for an object. */
        function(t) {
            return t.constructor ? t.constructor.name : null;
        }(t);
        return e ? "a custom " + e + " object" : "an object";
    }
    return "function" == typeof t ? "a function" : j();
}

function uc(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new Y(H.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        var n = oc(t);
        throw new Y(H.INVALID_ARGUMENT, "Expected type '" + e.name + "', but it was: " + n);
    }
    return t;
}

function sc(t, e) {
    if (e <= 0) throw new Y(H.INVALID_ARGUMENT, "Function " + t + "() requires a positive number, but it was: " + e + ".");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// settings() defaults:
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */ var ac = /** @class */ function() {
    function t(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new Y(H.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new Y(H.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.useFetchStreams = !!t.useFetchStreams, nc("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }, t;
}(), cc = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n) {
        this._authCredentials = e, this._appCheckCredentials = n, 
        /**
             * Whether it's a Firestore or Firestore Lite instance.
             */
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new ac({}), 
        this._settingsFrozen = !1, t instanceof ce ? this._databaseId = t : (this._app = t, 
        this._databaseId = function(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new Y(H.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new ce(t.options.projectId);
        }(t));
    }
    return Object.defineProperty(t.prototype, "app", {
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */
        get: function() {
            if (!this._app) throw new Y(H.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this._app;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_initialized", {
        get: function() {
            return this._settingsFrozen;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_terminated", {
        get: function() {
            return void 0 !== this._terminateTask;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype._setSettings = function(t) {
        if (this._settingsFrozen) throw new Y(H.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new ac(t), void 0 !== t.credentials && (this._authCredentials = function(t) {
            if (!t) return new $;
            switch (t.type) {
              case "gapi":
                var e = t.client;
                // Make sure this really is a Gapi client.
                                return z(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new nt(e, t.sessionIndex || "0", t.iamToken || null);

              case "provider":
                return t.client;

              default:
                throw new Y(H.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
            }
        }(t.credentials));
    }, t.prototype._getSettings = function() {
        return this._settings;
    }, t.prototype._freezeSettings = function() {
        return this._settingsFrozen = !0, this._settings;
    }, t.prototype._delete = function() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }, 
    /** Returns a JSON-serializable representation of this `Firestore` instance. */ t.prototype.toJSON = function() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    }, 
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    t.prototype._terminate = function() {
        /**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
        return t = this, (e = tc.get(t)) && (U("ComponentProvider", "Removing Datastore"), 
        tc.delete(t), e.terminate()), Promise.resolve();
        var t, e;
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */ function lc(t, e, n, r) {
    var i;
    void 0 === r && (r = {});
    var o = (t = uc(t, cc))._getSettings();
    if ("firestore.googleapis.com" !== o.host && o.host !== e && K("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
    t._setSettings(Object.assign(Object.assign({}, o), {
        host: e + ":" + n,
        ssl: !1
    })), r.mockUserToken) {
        var u, s;
        if ("string" == typeof r.mockUserToken) u = r.mockUserToken, s = R.MOCK_USER; else {
            // Let createMockUserToken validate first (catches common mistakes like
            // invalid field "uid" and missing field "sub" / "user_id".)
            u = E(r.mockUserToken, null === (i = t._app) || void 0 === i ? void 0 : i.options.projectId);
            var a = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!a) throw new Y(H.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
            s = new R(a);
        }
        t._authCredentials = new Z(new X(u, s));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */ var hc = /** @class */ function() {
    /** @hideconstructor */
    function t(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._key = n, 
        /** The type of this Firestore reference. */
        this.type = "document", this.firestore = t;
    }
    return Object.defineProperty(t.prototype, "_path", {
        get: function() {
            return this._key.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "id", {
        /**
         * The document's identifier within its collection.
         */
        get: function() {
            return this._key.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "path", {
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */
        get: function() {
            return this._key.path.canonicalString();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        /**
         * The collection this `DocumentReference` belongs to.
         */
        get: function() {
            return new dc(this.firestore, this.converter, this._key.path.popLast());
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._key);
    }, t;
}(), fc = /** @class */ function() {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    function t(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._query = n, 
        /** The type of this Firestore reference. */
        this.type = "query", this.firestore = t;
    }
    return t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._query);
    }, t;
}(), dc = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, an(r)) || this)._path = r, 
        /** The type of this Firestore reference. */
        i.type = "collection", i;
    }
    return t(n, e), Object.defineProperty(n.prototype, "id", {
        /** The collection's identifier. */ get: function() {
            return this._query.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */
        get: function() {
            return this._query.path.canonicalString();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */
        get: function() {
            var t = this._path.popLast();
            return t.isEmpty() ? null : new hc(this.firestore, 
            /* converter= */ null, new mt(t));
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.withConverter = function(t) {
        return new n(this.firestore, t, this._path);
    }, n;
}(fc);

/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */ function pc(t, e) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    if (t = I(t), ec("collection", "path", e), t instanceof cc) {
        var o = pt.fromString.apply(pt, r([ e ], n));
        return ic(o), new dc(t, /* converter= */ null, o);
    }
    if (!(t instanceof hc || t instanceof dc)) throw new Y(H.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    var u = t._path.child(pt.fromString.apply(pt, r([ e ], n)));
    return ic(u), new dc(t.firestore, 
    /* converter= */ null, u);
}

// TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */ function vc(t, e) {
    if (t = uc(t, cc), ec("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new Y(H.INVALID_ARGUMENT, "Invalid collection ID '" + e + "' passed to function collectionGroup(). Collection IDs must not contain '/'.");
    return new fc(t, 
    /* converter= */ null, 
    /**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
    function(t) {
        return new un(pt.emptyPath(), t);
    }(e));
}

function yc(t, e) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    if (t = I(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (e = st.I()), ec("doc", "path", e), t instanceof cc) {
        var o = pt.fromString.apply(pt, r([ e ], n));
        return rc(o), new hc(t, 
        /* converter= */ null, new mt(o));
    }
    if (!(t instanceof hc || t instanceof dc)) throw new Y(H.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    var u = t._path.child(pt.fromString.apply(pt, r([ e ], n)));
    return rc(u), new hc(t.firestore, t instanceof dc ? t.converter : null, new mt(u));
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function mc(t, e) {
    return t = I(t), e = I(e), (t instanceof hc || t instanceof dc) && (e instanceof hc || e instanceof dc) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter
    /**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */;
}

function gc(t, e) {
    return t = I(t), e = I(e), t instanceof fc && e instanceof fc && t.firestore === e.firestore && vn(t._query, e._query) && t.converter === e.converter
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;
}

var wc = /** @class */ function() {
    function t() {
        var t = this;
        // The last promise in the queue.
                this.Oc = Promise.resolve(), 
        // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.Mc = [], 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.Fc = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.$c = [], 
        // visible for testing
        this.Bc = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.Lc = !1, 
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.Uc = !1, 
        // List of TimerIds to fast-forward delays for.
        this.qc = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.So = new Zu(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Kc = function() {
            var e = Xu();
            e && U("AsyncQueue", "Visibility state changed to " + e.visibilityState), t.So.Eo();
        };
        var e = Xu();
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.Kc);
    }
    return Object.defineProperty(t.prototype, "isShuttingDown", {
        get: function() {
            return this.Fc;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t.prototype.enqueueAndForget = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }, t.prototype.enqueueAndForgetEvenWhileRestricted = function(t) {
        this.Gc(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Qc(t);
    }, t.prototype.enterRestrictedMode = function(t) {
        if (!this.Fc) {
            this.Fc = !0, this.Uc = t || !1;
            var e = Xu();
            e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Kc);
        }
    }, t.prototype.enqueue = function(t) {
        var e = this;
        if (this.Gc(), this.Fc) 
        // Return a Promise which never resolves.
        return new Promise((function() {}));
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
                var n = new J;
        return this.Qc((function() {
            return e.Fc && e.Uc ? Promise.resolve() : (t().then(n.resolve, n.reject), n.promise);
        })).then((function() {
            return n.promise;
        }));
    }, t.prototype.enqueueRetryable = function(t) {
        var e = this;
        this.enqueueAndForget((function() {
            return e.Mc.push(t), e.jc();
        }));
    }, 
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    t.prototype.jc = function() {
        return e(this, void 0, void 0, (function() {
            var t, e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    if (0 === this.Mc.length) return [ 3 /*break*/ , 5 ];
                    n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.Mc[0]() ];

                  case 2:
                    return n.sent(), this.Mc.shift(), this.So.reset(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!Rt(t = n.sent())) throw t;
                    // Failure will be handled by AsyncQueue
                                        return U("AsyncQueue", "Operation failed with retryable error: " + t), 
                    [ 3 /*break*/ , 4 ];

                  case 4:
                    this.Mc.length > 0 && 
                    // If there are additional operations, we re-schedule `retryNextOp()`.
                    // This is necessary to run retryable operations that failed during
                    // their initial attempt since we don't know whether they are already
                    // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                    // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                    // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                    // call scheduled here.
                    // Since `backoffAndRun()` cancels an existing backoff and schedules a
                    // new backoff on every call, there is only ever a single additional
                    // operation in the queue.
                    this.So.Io((function() {
                        return e.jc();
                    })), n.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Qc = function(t) {
        var e = this, n = this.Oc.then((function() {
            return e.Lc = !0, t().catch((function(t) {
                e.Bc = t, e.Lc = !1;
                var n = 
                /**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
                function(t) {
                    var e = t.message || "";
                    return t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack), 
                    e;
                }(t);
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                                throw B("INTERNAL UNHANDLED ERROR: ", n), t;
            })).then((function(t) {
                return e.Lc = !1, t;
            }));
        }));
        return this.Oc = n, n;
    }, t.prototype.enqueueAfterDelay = function(t, e, n) {
        var r = this;
        this.Gc(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.qc.indexOf(t) > -1 && (e = 0);
        var i = Vs.createAndSchedule(this, t, e, n, (function(t) {
            return r.Wc(t);
        }));
        return this.$c.push(i), i;
    }, t.prototype.Gc = function() {
        this.Bc && j();
    }, t.prototype.verifyOperationInProgress = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.zc = function() {
        return e(this, void 0, void 0, (function() {
            var t;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , t = this.Oc ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    if (t !== this.Oc) return [ 3 /*break*/ , 0 ];
                    e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    t.prototype.Hc = function(t) {
        for (var e = 0, n = this.$c; e < n.length; e++) {
            if (n[e].timerId === t) return !0;
        }
        return !1;
    }, 
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    t.prototype.Jc = function(t) {
        var e = this;
        // Note that draining may generate more delayed ops, so we do that first.
                return this.zc().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.$c.sort((function(t, e) {
                return t.targetTimeMs - e.targetTimeMs;
            }));
            for (var n = 0, r = e.$c; n < r.length; n++) {
                var i = r[n];
                if (i.skipDelay(), "all" /* All */ !== t && i.timerId === t) break;
            }
            return e.zc();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.Yc = function(t) {
        this.qc.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.Wc = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.$c.indexOf(t);
        this.$c.splice(e, 1);
    }, t;
}();

function bc(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        for (var n = t, r = 0, i = [ "next", "error", "complete" ]; r < i.length; r++) {
            var o = i[r];
            if (o in n && "function" == typeof n[o]) return !0;
        }
        return !1;
    }(t);
}

var Ic = /** @class */ function() {
    function t() {
        this._progressObserver = {}, this._taskCompletionResolver = new J, this._lastProgress = {
            taskState: "Running",
            totalBytes: 0,
            totalDocuments: 0,
            bytesLoaded: 0,
            documentsLoaded: 0
        }
        /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */;
    }
    return t.prototype.onProgress = function(t, e, n) {
        this._progressObserver = {
            next: t,
            error: e,
            complete: n
        };
    }, 
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t.prototype.catch = function(t) {
        return this._taskCompletionResolver.promise.catch(t);
    }, 
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t.prototype.then = function(t, e) {
        return this._taskCompletionResolver.promise.then(t, e);
    }, 
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */
    t.prototype._completeWith = function(t) {
        this._updateProgress(t), this._progressObserver.complete && this._progressObserver.complete(), 
        this._taskCompletionResolver.resolve(t);
    }, 
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */
    t.prototype._failWith = function(t) {
        this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), 
        this._progressObserver.error && this._progressObserver.error(t), this._taskCompletionResolver.reject(t);
    }, 
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */
    t.prototype._updateProgress = function(t) {
        this._lastProgress = t, this._progressObserver.next && this._progressObserver.next(t);
    }, t;
}(), Ec = -1, Tc = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r) {
        var i = this;
        /**
             * Whether it's a {@link Firestore} or Firestore Lite instance.
             */
        return (i = e.call(this, t, n, r) || this).type = "firestore", i._queue = new wc, 
        i._persistenceKey = "name" in t ? t.name : "[DEFAULT]", i;
    }
    return t(n, e), n.prototype._terminate = function() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        xc(this), this._firestoreClient.terminate();
    }, n;
}(cc);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** DOMException error code constants. */
/**
 * Initializes a new instance of {@link Firestore} with the provided settings.
 * Can only be called before any other function, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the {@link Firestore} instance will
 * be associated.
 * @param settings - A settings object to configure the {@link Firestore} instance.
 * @returns A newly initialized {@link Firestore} instance.
 */
function Sc(t, e) {
    var n = _getProvider(t, "firestore");
    if (n.isInitialized()) {
        var r = n.getImmediate(), i = n.getOptions();
        if (T(i, e)) return r;
        throw new Y(H.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.");
    }
    if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new Y(H.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
    return n.initialize({
        options: e
    });
}

/**
 * Returns the existing {@link Firestore} instance that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned {@link Firestore}
 * instance is associated with.
 * @returns The {@link Firestore} instance of the provided app.
 */ function Dc(t) {
    return void 0 === t && (t = s()), _getProvider(t, "firestore").getImmediate();
}

/**
 * @internal
 */ function _c(t) {
    return t._firestoreClient || xc(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function xc(t) {
    var e, n = t._freezeSettings(), r = function(t, e, n, r) {
        return new ae(t, e, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, r.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
    t._firestoreClient = new Ka(t._authCredentials, t._appCheckCredentials, t._queue, r);
}

/**
 * Attempts to enable persistent storage, if possible.
 *
 * Must be called before any other functions (other than
 * {@link initializeFirestore}, {@link getFirestore} or
 * {@link clearIndexedDbPersistence}.
 *
 * If this fails, `enableIndexedDbPersistence()` will reject the promise it
 * returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @param persistenceSettings - Optional settings object to configure
 * persistence.
 * @returns A `Promise` that represents successfully enabling persistent storage.
 */ function Nc(t, e) {
    Pc(t = uc(t, Tc));
    var n = _c(t), r = t._freezeSettings(), i = new La;
    return kc(n, i, new Ma(i, r.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
}

/**
 * Attempts to enable multi-tab persistent storage, if possible. If enabled
 * across all tabs, all operations share access to local persistence, including
 * shared execution of queries and latency-compensated local document updates
 * across all connected instances.
 *
 * If this fails, `enableMultiTabIndexedDbPersistence()` will reject the promise
 * it returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab and
 *     multi-tab is not enabled.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @returns A `Promise` that represents successfully enabling persistent
 * storage.
 */ function Ac(t) {
    Pc(t = uc(t, Tc));
    var e = _c(t), n = t._freezeSettings(), r = new La;
    return kc(e, r, new Ra(r, n.cacheSizeBytes));
}

/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */ function kc(t, r, i) {
    var o = this, u = new J;
    return t.asyncQueue.enqueue((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , Ga(t, i) ];

                  case 1:
                    return n.sent(), [ 4 /*yield*/ , ja(t, r) ];

                  case 2:
                    return n.sent(), u.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!
                    /**
         * Decides whether the provided error allows us to gracefully disable
         * persistence (as opposed to crashing the client).
         */
                    function(t) {
                        return "FirebaseError" === t.name ? t.code === H.FAILED_PRECONDITION || t.code === H.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || (22 === t.code || 20 === t.code || 
                        // Firefox Private Browsing mode disables IndexedDb and returns
                        // INVALID_STATE for any usage.
                        11 === t.code);
                    }(e = n.sent())) throw e;
                    return console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + e), 
                    u.reject(e), [ 3 /*break*/ , 4 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    })).then((function() {
        return u.promise;
    }));
}

function Cc(t) {
    var r = this;
    if (t._initialized && !t._terminated) throw new Y(H.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
    var i = new J;
    return t._queue.enqueueAndForgetEvenWhileRestricted((function() {
        return e(r, void 0, void 0, (function() {
            var r;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t) {
                        return e(this, void 0, void 0, (function() {
                            var e;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return Vt.V() ? (e = t + "main", [ 4 /*yield*/ , Vt.delete(e) ]) : [ 2 /*return*/ , Promise.resolve() ];

                                  case 1:
                                    return n.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(yu(t._databaseId, t._persistenceKey)) ];

                  case 1:
                    return o.sent(), i.resolve(), [ 3 /*break*/ , 3 ];

                  case 2:
                    return r = o.sent(), i.reject(r), [ 3 /*break*/ , 3 ];

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    })), i.promise
    /**
 * Waits until all currently pending writes for the active user have been
 * acknowledged by the backend.
 *
 * The returned promise resolves immediately if there are no outstanding writes.
 * Otherwise, the promise waits for all previously issued writes (including
 * those written in a previous app session), but it does not wait for writes
 * that were added after the function is called. If you want to wait for
 * additional writes, call `waitForPendingWrites()` again.
 *
 * Any outstanding `waitForPendingWrites()` promises are rejected during user
 * changes.
 *
 * @returns A `Promise` which resolves when all currently pending writes have been
 * acknowledged by the backend.
 */;
}

function Vc(t) {
    return function(t) {
        var r = this, i = new J;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(r, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = la, [ 4 /*yield*/ , Ja(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), i ]) ];
                    }
                }));
            }));
        })), i.promise;
    }(_c(t = uc(t, Tc)));
}

/**
 * Re-enables use of the network for this {@link Firestore} instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A `Promise` that is resolved once the network has been enabled.
 */ function Oc(t) {
    return function(t) {
        var r = this;
        return t.asyncQueue.enqueue((function() {
            return e(r, void 0, void 0, (function() {
                var e, r;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return [ 4 /*yield*/ , Wa(t) ];

                      case 1:
                        return e = n.sent(), [ 4 /*yield*/ , Ya(t) ];

                      case 2:
                        return r = n.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!0), function(t) {
                            var e = W(t);
                            return e.lu.delete(0 /* UserDisabled */), us(e);
                        }(r)) ];
                    }
                }));
            }));
        }));
    }
    /** Disables the network connection. Pending operations will not complete. */ (_c(t = uc(t, Tc)));
}

/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A `Promise` that is resolved once the network has been disabled.
 */ function Mc(t) {
    return function(t) {
        var r = this;
        return t.asyncQueue.enqueue((function() {
            return e(r, void 0, void 0, (function() {
                var r, i;
                return n(this, (function(o) {
                    switch (o.label) {
                      case 0:
                        return [ 4 /*yield*/ , Wa(t) ];

                      case 1:
                        return r = o.sent(), [ 4 /*yield*/ , Ya(t) ];

                      case 2:
                        return i = o.sent(), [ 2 /*return*/ , (r.setNetworkEnabled(!1), function(t) {
                            return e(this, void 0, void 0, (function() {
                                var e;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = W(t)).lu.add(0 /* UserDisabled */), [ 4 /*yield*/ , ss(e) ];

                                      case 1:
                                        return n.sent(), 
                                        // Set the OnlineState to Offline so get()s return from cache, etc.
                                        e._u.set("Offline" /* Offline */), [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }(i)) ];
                    }
                }));
            }));
        }));
    }
    /**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */ (_c(t = uc(t, Tc)));
}

/**
 * Terminates the provided {@link Firestore} instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` function
 * may be used. Any other function will throw a `FirestoreError`.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Termination does not cancel any pending writes, and any promises that are
 * awaiting a response from the server will not be resolved. If you have
 * persistence enabled, the next time you start this instance, it will resume
 * sending these writes to the server.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all
 * of its resources or in combination with `clearIndexedDbPersistence()` to
 * ensure that all local state is destroyed between test runs.
 *
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */ function Rc(t) {
    return a(t.app, "firestore"), t._delete()
    /**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The {@link Firestore} instance to load bundles for.
 * @param bundleData - An object representing the bundle to be loaded. Valid
 * objects are `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns A `LoadBundleTask` object, which notifies callers with progress
 * updates, and completion or error events. It can be used as a
 * `Promise<LoadBundleTaskProgress>`.
 */;
}

function Lc(t, r) {
    var i = _c(t = uc(t, Tc)), o = new Ic;
    return function(t, r, i, o) {
        var u = this, s = function(t, e) {
            return function(t, e) {
                return new qa(t, e);
            }(function(t, e) {
                if (t instanceof Uint8Array) return Fa(t, e);
                if (t instanceof ArrayBuffer) return Fa(new Uint8Array(t), e);
                if (t instanceof ReadableStream) return t.getReader();
                throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
            }("string" == typeof t ? (new TextEncoder).encode(t) : t), e);
        }(i, $u(r));
        t.asyncQueue.enqueueAndForget((function() {
            return e(u, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Va, [ 4 /*yield*/ , Ja(t) ];

                      case 1:
                        return e.apply(void 0, [ n.sent(), s, o ]), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }(i, t._databaseId, r, o), o
    /**
 * Reads a Firestore {@link Query} from local cache, identified by the given
 * name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once
 * in local cache, use this method to extract a {@link Query} by name.
 *
 * @param firestore - The {@link Firestore} instance to read the query from.
 * @param name - The name of the query.
 * @returns A `Promise` that is resolved with the Query or `null`.
 */;
}

function Fc(t, r) {
    return function(t, r) {
        var i = this;
        return t.asyncQueue.enqueue((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            var n = W(t);
                            return n.persistence.runTransaction("Get named query", "readonly", (function(t) {
                                return n.Ds.getNamedQuery(t, e);
                            }));
                        }, [ 4 /*yield*/ , Ha(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r ]) ];
                    }
                }));
            }));
        }));
    }(_c(t = uc(t, Tc)), r).then((function(e) {
        return e ? new fc(t, null, e.query) : null;
    }));
}

function Pc(t) {
    if (t._initialized || t._terminated) throw new Y(H.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */ var qc = /** @class */ function() {
    /**
     * Creates a `FieldPath` from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = 0; n < t.length; ++n) if (0 === t[n].length) throw new Y(H.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new yt(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    return t.prototype.isEqual = function(t) {
        return this._internalPath.isEqual(t._internalPath);
    }, t;
}();

/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */ function Uc() {
    return new qc("__name__");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable object representing an array of bytes.
 */ var Bc = /** @class */ function() {
    /** @hideconstructor */
    function t(t) {
        this._byteString = t;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */    return t.fromBase64String = function(e) {
        try {
            return new t(te.fromBase64String(e));
        } catch (e) {
            throw new Y(H.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
        }
    }, 
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    t.fromUint8Array = function(e) {
        return new t(te.fromUint8Array(e));
    }, 
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    t.prototype.toBase64 = function() {
        return this._byteString.toBase64();
    }, 
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    t.prototype.toUint8Array = function() {
        return this._byteString.toUint8Array();
    }, 
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    t.prototype.toString = function() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }, 
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return this._byteString.isEqual(t._byteString);
    }, t;
}(), Kc = 
/**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
function(t) {
    this._methodName = t;
}, Gc = /** @class */ function() {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    function t(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new Y(H.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new Y(H.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e;
    }
    return Object.defineProperty(t.prototype, "latitude", {
        /**
         * The latitude of this `GeoPoint` instance.
         */
        get: function() {
            return this._lat;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "longitude", {
        /**
         * The longitude of this `GeoPoint` instance.
         */
        get: function() {
            return this._long;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return this._lat === t._lat && this._long === t._long;
    }, 
    /** Returns a JSON-serializable representation of this GeoPoint. */ t.prototype.toJSON = function() {
        return {
            latitude: this._lat,
            longitude: this._long
        };
    }, 
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t.prototype._compareTo = function(t) {
        return at(this._lat, t._lat) || at(this._long, t._long);
    }, t;
}(), jc = /^__.*__$/, zc = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return null !== this.fieldMask ? new Hn(t, this.data, this.fieldMask, e, this.fieldTransforms) : new Wn(t, this.data, e, this.fieldTransforms);
    }, t;
}(), Qc = /** @class */ function() {
    function t(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return new Hn(t, this.data, this.fieldMask, e, this.fieldTransforms);
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */ function Wc(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw j();
    }
}

/** A "context" object passed around while parsing user data. */ var Hc = /** @class */ function() {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    function t(t, e, n, r, i, o) {
        this.settings = t, this.databaseId = e, this.wt = n, this.ignoreUndefinedProperties = r, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.Xc(), this.fieldTransforms = i || [], this.fieldMask = o || [];
    }
    return Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.settings.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Zc", {
        get: function() {
            return this.settings.Zc;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Returns a new context with the specified settings overwritten. */ t.prototype.ta = function(e) {
        return new t(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.wt, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }, t.prototype.ea = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.ta({
            path: n,
            na: !1
        });
        return r.sa(t), r;
    }, t.prototype.ia = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.ta({
            path: n,
            na: !1
        });
        return r.Xc(), r;
    }, t.prototype.ra = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.ta({
            path: void 0,
            na: !0
        });
    }, t.prototype.oa = function(t) {
        return pl(t, this.settings.methodName, this.settings.ua || !1, this.path, this.settings.ca);
    }, 
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ t.prototype.contains = function(t) {
        return void 0 !== this.fieldMask.find((function(e) {
            return t.isPrefixOf(e);
        })) || void 0 !== this.fieldTransforms.find((function(e) {
            return t.isPrefixOf(e.field);
        }));
    }, t.prototype.Xc = function() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (var t = 0; t < this.path.length; t++) this.sa(this.path.get(t));
    }, t.prototype.sa = function(t) {
        if (0 === t.length) throw this.oa("Document fields must not be empty");
        if (Wc(this.Zc) && jc.test(t)) throw this.oa('Document fields cannot begin and end with "__"');
    }, t;
}(), Yc = /** @class */ function() {
    function t(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.wt = n || $u(t)
        /** Creates a new top-level parse context. */;
    }
    return t.prototype.aa = function(t, e, n, r) {
        return void 0 === r && (r = !1), new Hc({
            Zc: t,
            methodName: e,
            ca: n,
            path: yt.emptyPath(),
            na: !1,
            ua: r
        }, this.databaseId, this.wt, this.ignoreUndefinedProperties);
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ function Jc(t) {
    var e = t._freezeSettings(), n = $u(t._databaseId);
    return new Yc(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function Xc(t, e, n, r, i, o) {
    void 0 === o && (o = {});
    var u = t.aa(o.merge || o.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
    ll("Data must be an object, but it was:", u, r);
    var s, a, c = al(r, u);
    if (o.merge) s = new $t(u.fieldMask), a = u.fieldTransforms; else if (o.mergeFields) {
        for (var l = [], h = 0, f = o.mergeFields; h < f.length; h++) {
            var d = hl(e, f[h], n);
            if (!u.contains(d)) throw new Y(H.INVALID_ARGUMENT, "Field '" + d + "' is specified in your field mask but missing from your input data.");
            vl(l, d) || l.push(d);
        }
        s = new $t(l), a = u.fieldTransforms.filter((function(t) {
            return s.covers(t.field);
        }));
    } else s = null, a = u.fieldTransforms;
    return new zc(new Me(c), s, a);
}

var $c = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        if (2 /* MergeSet */ !== t.Zc) throw 1 /* Update */ === t.Zc ? t.oa(this._methodName + "() can only appear at the top level of your update data") : t.oa(this._methodName + "() cannot be used with set() unless you pass {merge:true}");
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
                return t.fieldMask.push(t.path), null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Kc);

/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */ function Zc(t, e, n) {
    return new Hc({
        Zc: 3 /* Argument */ ,
        ca: e.settings.ca,
        methodName: t._methodName,
        na: n
    }, e.databaseId, e.wt, e.ignoreUndefinedProperties);
}

var tl = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        return new Fn(t.path, new An);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Kc), el = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).ha = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Zc(this, t, 
        /*array=*/ !0), n = this.ha.map((function(t) {
            return sl(t, e);
        })), r = new kn(n);
        return new Fn(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Kc), nl = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).ha = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Zc(this, t, 
        /*array=*/ !0), n = this.ha.map((function(t) {
            return sl(t, e);
        })), r = new Vn(n);
        return new Fn(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Kc), rl = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).la = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = new Mn(t.wt, Sn(t.wt, this.la));
        return new Fn(t.path, e);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Kc);

/** Parse update data from an update() call. */ function il(t, e, n, r) {
    var i = t.aa(1 /* Update */ , e, n);
    ll("Data must be an object, but it was:", i, r);
    var o = [], u = Me.empty();
    jt(r, (function(t, r) {
        var s = dl(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                r = I(r);
        var a = i.ia(s);
        if (r instanceof $c) 
        // Add it to the field mask, but don't add anything to updateData.
        o.push(s); else {
            var c = sl(r, a);
            null != c && (o.push(s), u.set(s, c));
        }
    }));
    var s = new $t(o);
    return new Qc(u, s, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function ol(t, e, n, r, i, o) {
    var u = t.aa(1 /* Update */ , e, n), s = [ hl(e, r, n) ], a = [ i ];
    if (o.length % 2 != 0) throw new Y(H.INVALID_ARGUMENT, "Function " + e + "() needs to be called with an even number of arguments that alternate between field names and values.");
    for (var c = 0; c < o.length; c += 2) s.push(hl(e, o[c])), a.push(o[c + 1]);
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (var l = [], h = Me.empty(), f = s.length - 1; f >= 0; --f) if (!vl(l, s[f])) {
        var d = s[f], p = a[f];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        p = I(p);
        var v = u.ia(d);
        if (p instanceof $c) 
        // Add it to the field mask, but don't add anything to updateData.
        l.push(d); else {
            var y = sl(p, v);
            null != y && (l.push(d), h.set(d, y));
        }
    }
    var m = new $t(l);
    return new Qc(h, m, u.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function ul(t, e, n, r) {
    return void 0 === r && (r = !1), sl(n, t.aa(r ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function sl(t, e) {
    if (cl(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = I(t))) return ll("Unsupported field value:", e, t), al(t, e);
    if (t instanceof Kc) 
    // FieldValues usually parse into transforms (except deleteField())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!Wc(e.Zc)) throw e.oa(t._methodName + "() can only be used with update() and set()");
        if (!e.path) throw e.oa(t._methodName + "() is not currently supported inside arrays");
        var n = t._toFieldTransform(e);
        n && e.fieldTransforms.push(n);
    }(t, e), null;
    if (void 0 === t && e.ignoreUndefinedProperties) 
    // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.na && 4 /* ArrayArgument */ !== e.Zc) throw e.oa("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var u = sl(o[i], e.ra(r));
                null == u && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                u = {
                    nullValue: "NULL_VALUE"
                }), n.push(u), r++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === (t = I(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return Sn(e.wt, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = ht.fromDate(t);
            return {
                timestampValue: Cr(e.wt, n)
            };
        }
        if (t instanceof ht) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            var r = new ht(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: Cr(e.wt, r)
            };
        }
        if (t instanceof Gc) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof Bc) return {
            bytesValue: Vr(e.wt, t._byteString)
        };
        if (t instanceof hc) {
            var i = e.databaseId, o = t.firestore._databaseId;
            if (!o.isEqual(i)) throw e.oa("Document reference is for database " + o.projectId + "/" + o.database + " but should be for database " + i.projectId + "/" + i.database);
            return {
                referenceValue: Rr(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.oa("Unsupported field value: " + oc(t));
    }(t, e);
}

function al(t, e) {
    var n = {};
    return zt(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : jt(t, (function(t, r) {
        var i = sl(r, e.ea(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function cl(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof ht || t instanceof Gc || t instanceof Bc || t instanceof hc || t instanceof Kc);
}

function ll(t, e, n) {
    if (!cl(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        var r = oc(n);
        throw "an object" === r ? e.oa(t + " a custom object") : e.oa(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function hl(t, e, n) {
    if (
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    (e = I(e)) instanceof qc) return e._internalPath;
    if ("string" == typeof e) return dl(t, e);
    throw pl("Field path arguments must be of type string or ", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ var fl = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function dl(t, e, n) {
    if (e.search(fl) >= 0) throw pl("Invalid field path (" + e + "). Paths must not contain '~', '*', '/', '[', or ']'", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
    try {
        return (new (qc.bind.apply(qc, r([ void 0 ], e.split(".")))))._internalPath;
    } catch (r) {
        throw pl("Invalid field path (" + e + "). Paths must not be empty, begin with '.', end with '.', or contain '..'", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }
}

function pl(t, e, n, r, i) {
    var o = r && !r.isEmpty(), u = void 0 !== i, s = "Function " + e + "() called with invalid data";
    n && (s += " (via `toFirestore()`)");
    var a = "";
    return (o || u) && (a += " (found", o && (a += " in field " + r), u && (a += " in document " + i), 
    a += ")"), new Y(H.INVALID_ARGUMENT, (s += ". ") + t + a)
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */;
}

function vl(t, e) {
    return t.some((function(t) {
        return t.isEqual(e);
    }));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ var yl = /** @class */ function() {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    function t(t, e, n, r, i) {
        this._firestore = t, this._userDataWriter = e, this._key = n, this._document = r, 
        this._converter = i;
    }
    return Object.defineProperty(t.prototype, "id", {
        /** Property of the `DocumentSnapshot` that provides the document's ID. */ get: function() {
            return this._key.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ref", {
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */
        get: function() {
            return new hc(this._firestore, this._converter, this._key);
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    t.prototype.exists = function() {
        return null !== this._document;
    }, 
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    t.prototype.data = function() {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                var t = new ml(this._firestore, this._userDataWriter, this._key, this._document, 
                /* converter= */ null);
                return this._converter.fromFirestore(t);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }, 
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.prototype.get = function(t) {
        if (this._document) {
            var e = this._document.data.field(gl("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }, t;
}(), ml = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */    return t(n, e), n.prototype.data = function() {
        return e.prototype.data.call(this);
    }, n;
}(yl);

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */
/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */
function gl(t, e) {
    return "string" == typeof e ? dl(t, e) : e instanceof qc ? e._internalPath : e._delegate._internalPath;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Metadata about a snapshot, describing the state of the snapshot.
 */ var wl = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this.hasPendingWrites = t, this.fromCache = e
        /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */;
    }
    return t.prototype.isEqual = function(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }, t;
}(), bl = /** @class */ function(e) {
    /** @hideconstructor protected */
    function n(t, n, r, i, o, u) {
        var s = this;
        return (s = e.call(this, t, n, r, i, u) || this)._firestore = t, s._firestoreImpl = t, 
        s.metadata = o, s;
    }
    /**
     * Returns whether or not the data exists. True if the document exists.
     */    return t(n, e), n.prototype.exists = function() {
        return e.prototype.exists.call(this);
    }, 
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */
    n.prototype.data = function(t) {
        if (void 0 === t && (t = {}), this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                var e = new Il(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
                /* converter= */ null);
                return this._converter.fromFirestore(e, t);
            }
            return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
        }
    }, 
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n.prototype.get = function(t, e) {
        if (void 0 === e && (e = {}), this._document) {
            var n = this._document.data.field(gl("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }, n;
}(yl), Il = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document.
     */    return t(n, e), n.prototype.data = function(t) {
        return void 0 === t && (t = {}), e.prototype.data.call(this, t);
    }, n;
}(bl), El = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n, r) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new wl(r.hasPendingWrites, r.fromCache), 
        this.query = n;
    }
    return Object.defineProperty(t.prototype, "docs", {
        /** An array of all the documents in the `QuerySnapshot`. */ get: function() {
            var t = [];
            return this.forEach((function(e) {
                return t.push(e);
            })), t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        /** The number of documents in the `QuerySnapshot`. */ get: function() {
            return this._snapshot.docs.size;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "empty", {
        /** True if there are no documents in the `QuerySnapshot`. */ get: function() {
            return 0 === this.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    t.prototype.forEach = function(t, e) {
        var n = this;
        this._snapshot.docs.forEach((function(r) {
            t.call(e, new Il(n._firestore, n._userDataWriter, r.key, r, new wl(n._snapshot.mutatedKeys.has(r.key), n._snapshot.fromCache), n.query.converter));
        }));
    }, 
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */
    t.prototype.docChanges = function(t) {
        void 0 === t && (t = {});
        var e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges) throw new Y(H.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                var n = 0;
                return t._snapshot.docChanges.map((function(e) {
                    return {
                        type: "added",
                        doc: new Il(t._firestore, t._userDataWriter, e.doc.key, e.doc, new wl(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter),
                        oldIndex: -1,
                        newIndex: n++
                    };
                }));
            }
            // A `DocumentSet` that is updated incrementally as changes are applied to use
            // to lookup the index of a document.
            var r = t._snapshot.oldDocs;
            return t._snapshot.docChanges.filter((function(t) {
                return e || 3 /* Metadata */ !== t.type;
            })).map((function(e) {
                var n = new Il(t._firestore, t._userDataWriter, e.doc.key, e.doc, new wl(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter), i = -1, o = -1;
                return 0 /* Added */ !== e.type && (i = r.indexOf(e.doc.key), r = r.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (o = (r = r.add(e.doc)).indexOf(e.doc.key)), {
                    type: Tl(e.type),
                    doc: n,
                    oldIndex: i,
                    newIndex: o
                };
            }));
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
    }, t;
}();

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ function Tl(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return j();
    }
}

// TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
// metadata
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */ function Sl(t, e) {
    return t instanceof bl && e instanceof bl ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof El && e instanceof El && t._firestore === e._firestore && gc(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Dl(t) {
    if ("L" /* Last */ === t.limitType && 0 === t.explicitOrderBy.length) throw new Y(H.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ var _l = function() {};

/**
 * Creates a new immutable instance of {@link Query} that is extended to also include
 * additional query constraints.
 *
 * @param query - The {@link Query} instance to use as a base for the new constraints.
 * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ function xl(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    for (var r = 0, i = e; r < i.length; r++) {
        var o = i[r];
        t = o._apply(t);
    }
    return t;
}

var Nl = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).fa = t, i.da = n, i._a = r, i.type = "where", 
        i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Jc(t.firestore), n = function(t, e, n, r, i, o, u) {
            var s;
            if (i.isKeyField()) {
                if ("array-contains" /* ARRAY_CONTAINS */ === o || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o) throw new Y(H.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on documentId().");
                if ("in" /* IN */ === o || "not-in" /* NOT_IN */ === o) {
                    Gl(u, o);
                    for (var a = [], c = 0, l = u; c < l.length; c++) {
                        var h = l[c];
                        a.push(Kl(r, t, h));
                    }
                    s = {
                        arrayValue: {
                            values: a
                        }
                    };
                } else s = Kl(r, t, u);
            } else "in" /* IN */ !== o && "not-in" /* NOT_IN */ !== o && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== o || Gl(u, o), 
            s = ul(n, "where", u, 
            /* allowArrays= */ "in" /* IN */ === o || "not-in" /* NOT_IN */ === o);
            var f = ze.create(i, o, s);
            return function(t, e) {
                if (e.ht()) {
                    var n = ln(t);
                    if (null !== n && !n.isEqual(e.field)) throw new Y(H.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '" + n.toString() + "' and '" + e.field.toString() + "'");
                    var r = cn(t);
                    null !== r && jl(t, e.field, r);
                }
                var i = function(t, e) {
                    for (var n = 0, r = t.filters; n < r.length; n++) {
                        var i = r[n];
                        if (e.indexOf(i.op) >= 0) return i.op;
                    }
                    return null;
                }(t, 
                /**
 * Given an operator, returns the set of operators that cannot be used with it.
 *
 * Operators in a query must adhere to the following set of rules:
 * 1. Only one array operator is allowed.
 * 2. Only one disjunctive operator is allowed.
 * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
 * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
 *
 * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
 * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
 */
                function(t) {
                    switch (t) {
                      case "!=" /* NOT_EQUAL */ :
                        return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                      case "array-contains" /* ARRAY_CONTAINS */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                      case "in" /* IN */ :
                        return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "not-in" /* NOT_IN */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                      default:
                        return [];
                    }
                }(e.op));
                if (null !== i) 
                // Special case when it's a duplicate op to give a slightly clearer error message.
                throw i === e.op ? new Y(H.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + e.op.toString() + "' filter.") : new Y(H.INVALID_ARGUMENT, "Invalid query. You cannot use '" + e.op.toString() + "' filters with '" + i.toString() + "' filters.");
            }(t, f), f;
        }(t._query, 0, e, t.firestore._databaseId, this.fa, this.da, this._a);
        return new fc(t.firestore, t.converter, function(t, e) {
            var n = t.filters.concat([ e ]);
            return new un(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, n));
    }, n;
}(_l);

/**
 * Creates a {@link QueryConstraint} that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link Query}.
 */ function Al(t, e, n) {
    var r = e, i = gl("where", t);
    return new Nl(i, r, n);
}

var kl = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).fa = t, r.wa = n, r.type = "orderBy", r;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = function(t, e, n) {
            if (null !== t.startAt) throw new Y(H.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new Y(H.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            var r = new en(e, n);
            return function(t, e) {
                if (null === cn(t)) {
                    // This is the first order by. It must match any inequality.
                    var n = ln(t);
                    null !== n && jl(t, n, e.field);
                }
            }(t, r), r;
        }(t._query, this.fa, this.wa);
        return new fc(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            var n = t.explicitOrderBy.concat([ e ]);
            return new un(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }, n;
}(_l);

/**
 * Creates a {@link QueryConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link Query}.
 */ function Cl(t, e) {
    void 0 === e && (e = "asc");
    var n = e, r = gl("orderBy", t);
    return new kl(r, n);
}

var Vl = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.ma = n, i.ga = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        return new fc(t.firestore, t.converter, pn(t._query, this.ma, this.ga));
    }, n;
}(_l);

/**
 * Creates a {@link QueryConstraint} that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ function Ol(t) {
    return sc("limit", t), new Vl("limit", t, "F" /* First */)
    /**
 * Creates a {@link QueryConstraint} that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */;
}

function Ml(t) {
    return sc("limitToLast", t), new Vl("limitToLast", t, "L" /* Last */);
}

var Rl = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.ya = n, i.pa = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Bl(t, this.type, this.ya, this.pa);
        return new fc(t.firestore, t.converter, function(t, e) {
            return new un(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }, n;
}(_l);

function Ll() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new Rl("startAt", t, 
    /*inclusive=*/ !0);
}

function Fl() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new Rl("startAfter", t, 
    /*inclusive=*/ !1);
}

var Pl = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.ya = n, i.pa = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Bl(t, this.type, this.ya, this.pa);
        return new fc(t.firestore, t.converter, function(t, e) {
            return new un(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }, n;
}(_l);

function ql() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new Pl("endBefore", t, 
    /*inclusive=*/ !1);
}

function Ul() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new Pl("endAt", t, /*inclusive=*/ !0);
}

/** Helper function to create a bound from a document or fields */ function Bl(t, e, n, r) {
    if (n[0] = I(n[0]), n[0] instanceof yl) return function(t, e, n, r, i) {
        if (!r) throw new Y(H.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n + "().");
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var o = [], u = 0, s = fn(t); u < s.length; u++) {
            var a = s[u];
            if (a.field.isKeyField()) o.push(Ee(e, r.key)); else {
                var c = r.data.field(a.field);
                if (oe(c)) throw new Y(H.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === c) {
                    var l = a.field.canonicalString();
                    throw new Y(H.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + l + "' (used as the orderBy) does not exist.");
                }
                o.push(c);
            }
        }
        return new tn(o, i);
    }(t._query, t.firestore._databaseId, e, n[0]._document, r);
    var i = Jc(t.firestore);
    return function(t, e, n, r, i, o) {
        // Use explicit order by's because it has to match the query the user made
        var u = t.explicitOrderBy;
        if (i.length > u.length) throw new Y(H.INVALID_ARGUMENT, "Too many arguments provided to " + r + "(). The number of arguments must be less than or equal to the number of orderBy() clauses");
        for (var s = [], a = 0; a < i.length; a++) {
            var c = i[a];
            if (u[a].field.isKeyField()) {
                if ("string" != typeof c) throw new Y(H.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + r + "(), but got a " + typeof c);
                if (!hn(t) && -1 !== c.indexOf("/")) throw new Y(H.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by documentId(), the value passed to " + r + "() must be a plain document ID, but '" + c + "' contains a slash.");
                var l = t.path.child(pt.fromString(c));
                if (!mt.isDocumentKey(l)) throw new Y(H.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by documentId(), the value passed to " + r + "() must result in a valid document path, but '" + l + "' is not because it contains an odd number of segments.");
                var h = new mt(l);
                s.push(Ee(e, h));
            } else {
                var f = ul(n, r, c);
                s.push(f);
            }
        }
        return new tn(s, o);
    }(t._query, t.firestore._databaseId, i, e, n, r);
}

function Kl(t, e, n) {
    if ("string" == typeof (n = I(n))) {
        if ("" === n) throw new Y(H.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!hn(e) && -1 !== n.indexOf("/")) throw new Y(H.INVALID_ARGUMENT, "Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '" + n + "' contains a '/' character.");
        var r = e.path.child(pt.fromString(n));
        if (!mt.isDocumentKey(r)) throw new Y(H.INVALID_ARGUMENT, "Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '" + r + "' is not because it has an odd number of segments (" + r.length + ").");
        return Ee(t, new mt(r));
    }
    if (n instanceof hc) return Ee(t, n._key);
    throw new Y(H.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: " + oc(n) + ".");
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function Gl(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new Y(H.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
    if (t.length > 10) throw new Y(H.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
}

function jl(t, e, n) {
    if (!n.isEqual(e)) throw new Y(H.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '" + e.toString() + "' and so you must also use '" + e.toString() + "' as your first argument to orderBy(), but your first orderBy() is on field '" + n.toString() + "' instead.");
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var zl = {
    maxAttempts: 5
}, Ql = /** @class */ function() {
    function t() {}
    return t.prototype.convertValue = function(t, e) {
        switch (void 0 === e && (e = "none"), ve(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return re(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return this.convertBytes(ie(t.bytesValue));

          case 7 /* RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw j();
        }
    }, t.prototype.convertObject = function(t, e) {
        var n = this, r = {};
        return jt(t.fields, (function(t, i) {
            r[t] = n.convertValue(i, e);
        })), r;
    }, t.prototype.convertGeoPoint = function(t) {
        return new Gc(re(t.latitude), re(t.longitude));
    }, t.prototype.convertArray = function(t, e) {
        var n = this;
        return (t.values || []).map((function(t) {
            return n.convertValue(t, e);
        }));
    }, t.prototype.convertServerTimestamp = function(t, e) {
        switch (e) {
          case "previous":
            var n = ue(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(se(t));

          default:
            return null;
        }
    }, t.prototype.convertTimestamp = function(t) {
        var e = ne(t);
        return new ht(e.seconds, e.nanos);
    }, t.prototype.convertDocumentKey = function(t, e) {
        var n = pt.fromString(t);
        z(ii(n));
        var r = new ce(n.get(1), n.get(3)), i = new mt(n.popFirst(5));
        return r.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        B("Document " + i + " contains a document reference within a different database (" + r.projectId + "/" + r.database + ") which is not supported. It will be treated as a reference in the current database (" + e.projectId + "/" + e.database + ") instead."), 
        i;
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */
function Wl(t, e, n) {
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e;
}

var Hl = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Bc(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new hc(this.firestore, /* converter= */ null, e);
    }, n;
}(Ql), Yl = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = Jc(t);
    }
    return t.prototype.set = function(t, e, n) {
        this._verifyNotCommitted();
        var r = Jl(t, this._firestore), i = Wl(r.converter, e, n), o = Xc(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
        return this._mutations.push(o.toMutation(r._key, qn.none())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        this._verifyNotCommitted();
        var o, u = Jl(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = I(e)) || e instanceof qc ? ol(this._dataReader, "WriteBatch.update", u._key, e, n, r) : il(this._dataReader, "WriteBatch.update", u._key, e), 
        this._mutations.push(o.toMutation(u._key, qn.exists(!0))), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        this._verifyNotCommitted();
        var e = Jl(t, this._firestore);
        return this._mutations = this._mutations.concat(new tr(e._key, qn.none())), this;
    }, 
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */
    t.prototype.commit = function() {
        return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }, t.prototype._verifyNotCommitted = function() {
        if (this._committed) throw new Y(H.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t;
}();

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */ function Jl(t, e) {
    if ((t = I(t)).firestore !== e) throw new Y(H.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return t;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function Xl(t) {
    t = uc(t, hc);
    var e = uc(t.firestore, Tc);
    return $a(_c(e), t._key).then((function(n) {
        return hh(e, t, n);
    }));
}

var $l = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Bc(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new hc(this.firestore, /* converter= */ null, e);
    }, n;
}(Ql);

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function Zl(t) {
    t = uc(t, hc);
    var r = uc(t.firestore, Tc), i = _c(r), o = new $l(r);
    return function(t, r) {
        var i = this, o = new J;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var i;
                return n(this, (function(u) {
                    switch (u.label) {
                      case 0:
                        return i = function(t, r, i) {
                            return e(this, void 0, void 0, (function() {
                                var e, o, u;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t, e) {
                                            var n = W(t);
                                            return n.persistence.runTransaction("read document", "readonly", (function(t) {
                                                return n.localDocuments.getDocument(t, e);
                                            }));
                                        }(t, r) ];

                                      case 1:
                                        return (e = n.sent()).isFoundDocument() ? i.resolve(e) : e.isNoDocument() ? i.resolve(null) : i.reject(new Y(H.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), 
                                        [ 3 /*break*/ , 3 ];

                                      case 2:
                                        return o = n.sent(), u = Os(o, "Failed to get document '" + r + " from cache"), 
                                        i.reject(u), [ 3 /*break*/ , 3 ];

                                      case 3:
                                        return [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }, [ 4 /*yield*/ , Ha(t) ];

                      case 1:
                        return [ 2 /*return*/ , i.apply(void 0, [ u.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(i, t._key).then((function(e) {
        return new bl(r, o, t._key, e, new wl(null !== e && e.hasLocalMutations, 
        /* fromCache= */ !0), t.converter);
    }));
}

/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function th(t) {
    t = uc(t, hc);
    var e = uc(t.firestore, Tc);
    return $a(_c(e), t._key, {
        source: "server"
    }).then((function(n) {
        return hh(e, t, n);
    }));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function eh(t) {
    t = uc(t, fc);
    var e = uc(t.firestore, Tc), n = _c(e), r = new $l(e);
    return Dl(t._query), Za(n, t._query).then((function(n) {
        return new El(e, r, t, n);
    }))
    /**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */;
}

function nh(t) {
    t = uc(t, fc);
    var r = uc(t.firestore, Tc), i = _c(r), o = new $l(r);
    return function(t, r) {
        var i = this, o = new J;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var i;
                return n(this, (function(u) {
                    switch (u.label) {
                      case 0:
                        return i = function(t, r, i) {
                            return e(this, void 0, void 0, (function() {
                                var e, o, u, s, a, c;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , Au(t, r, 
                                        /* usePreviousResults= */ !0) ];

                                      case 1:
                                        return e = n.sent(), o = new Xs(r, e.ji), u = o.Ku(e.documents), s = o.applyChanges(u, 
                                        /* updateLimboDocuments= */ !1), i.resolve(s.snapshot), [ 3 /*break*/ , 3 ];

                                      case 2:
                                        return a = n.sent(), c = Os(a, "Failed to execute query '" + r + " against cache"), 
                                        i.reject(c), [ 3 /*break*/ , 3 ];

                                      case 3:
                                        return [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }, [ 4 /*yield*/ , Ha(t) ];

                      case 1:
                        return [ 2 /*return*/ , i.apply(void 0, [ u.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(i, t._query).then((function(e) {
        return new El(r, o, t, e);
    }));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function rh(t) {
    t = uc(t, fc);
    var e = uc(t.firestore, Tc), n = _c(e), r = new $l(e);
    return Za(n, t._query, {
        source: "server"
    }).then((function(n) {
        return new El(e, r, t, n);
    }));
}

function ih(t, e, n) {
    t = uc(t, hc);
    var r = uc(t.firestore, Tc), i = Wl(t.converter, e, n);
    return lh(r, [ Xc(Jc(r), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, qn.none()) ]);
}

function oh(t, e, n) {
    for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
    t = uc(t, hc);
    var o = uc(t.firestore, Tc), u = Jc(o);
    return lh(o, [ ("string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = I(e)) || e instanceof qc ? ol(u, "updateDoc", t._key, e, n, r) : il(u, "updateDoc", t._key, e)).toMutation(t._key, qn.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function uh(t) {
    return lh(uc(t.firestore, Tc), [ new tr(t._key, qn.none()) ]);
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */ function sh(t, e) {
    var n = uc(t.firestore, Tc), r = yc(t), i = Wl(t.converter, e);
    return lh(n, [ Xc(Jc(t.firestore), "addDoc", r._key, i, null !== t.converter, {}).toMutation(r._key, qn.exists(!1)) ]).then((function() {
        return r;
    }));
}

function ah(t) {
    for (var r, i, o, u = [], s = 1; s < arguments.length; s++) u[s - 1] = arguments[s];
    t = I(t);
    var a = {
        includeMetadataChanges: !1
    }, c = 0;
    "object" != typeof u[c] || bc(u[c]) || (a = u[c], c++);
    var l, h, f, d = {
        includeMetadataChanges: a.includeMetadataChanges
    };
    if (bc(u[c])) {
        var p = u[c];
        u[c] = null === (r = p.next) || void 0 === r ? void 0 : r.bind(p), u[c + 1] = null === (i = p.error) || void 0 === i ? void 0 : i.bind(p), 
        u[c + 2] = null === (o = p.complete) || void 0 === o ? void 0 : o.bind(p);
    }
    if (t instanceof hc) h = uc(t.firestore, Tc), f = an(t._key.path), l = {
        next: function(e) {
            u[c] && u[c](hh(h, t, e));
        },
        error: u[c + 1],
        complete: u[c + 2]
    }; else {
        var v = uc(t, fc);
        h = uc(v.firestore, Tc), f = v._query;
        var y = new $l(h);
        l = {
            next: function(t) {
                u[c] && u[c](new El(h, y, v, t));
            },
            error: u[c + 1],
            complete: u[c + 2]
        }, Dl(t._query);
    }
    return function(t, r, i, o) {
        var u = this, s = new Pa(o), a = new js(r, s, i);
        return t.asyncQueue.enqueueAndForget((function() {
            return e(u, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = qs, [ 4 /*yield*/ , Xa(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                    }
                }));
            }));
        })), function() {
            s.Tc(), t.asyncQueue.enqueueAndForget((function() {
                return e(u, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = Us, [ 4 /*yield*/ , Xa(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                        }
                    }));
                }));
            }));
        };
    }(_c(h), f, d, l);
}

function ch(t, r) {
    return function(t, r) {
        var i = this, o = new Pa(r);
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            W(t).Tu.add(e), 
                            // Immediately fire an initial event, indicating all existing listeners
                            // are in-sync.
                            e.next();
                        }, [ 4 /*yield*/ , Xa(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                    }
                }));
            }));
        })), function() {
            o.Tc(), t.asyncQueue.enqueueAndForget((function() {
                return e(i, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = function(t, e) {
                                W(t).Tu.delete(e);
                            }, [ 4 /*yield*/ , Xa(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                        }
                    }));
                }));
            }));
        }
        /**
 * Takes an updateFunction in which a set of reads and writes can be performed
 * atomically. In the updateFunction, the client can read and write values
 * using the supplied transaction object. After the updateFunction, all
 * changes will be committed. If a retryable error occurs (ex: some other
 * client has changed any of the data referenced), then the updateFunction
 * will be called again after a backoff. If the updateFunction still fails
 * after all retries, then the transaction will be rejected.
 *
 * The transaction object passed to the updateFunction contains methods for
 * accessing documents and collections. Unlike other datastore access, data
 * accessed with the transaction will not reflect local changes that have not
 * been committed. For this reason, it is required that all reads are
 * performed before any writes. Transactions must be performed while online.
 */;
    }(_c(t = uc(t, Tc)), bc(r) ? r : {
        next: r
    });
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function lh(t, r) {
    return function(t, r) {
        var i = this, o = new J;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = ia, [ 4 /*yield*/ , Ja(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(_c(t), r);
}

/**
 * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
 * to a {@link DocumentSnapshot}.
 */ function hh(t, e, n) {
    var r = n.docs.get(e._key), i = new $l(t);
    return new bl(t, i, e._key, r, new wl(n.hasPendingWrites, n.fromCache), e.converter);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ var fh, dh = /** @class */ function(e) {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this)._firestore = t, r;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    return t(n, e), n.prototype.get = function(t) {
        var n = this, r = Jl(t, this._firestore), i = new $l(this._firestore);
        return e.prototype.get.call(this, t).then((function(t) {
            return new bl(n._firestore, i, r._key, t._document, new wl(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), r.converter);
        }));
    }, n;
}(/** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = Jc(t)
        /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */;
    }
    return t.prototype.get = function(t) {
        var e = this, n = Jl(t, this._firestore), r = new Hl(this._firestore);
        return this._transaction.lookup([ n._key ]).then((function(t) {
            if (!t || 1 !== t.length) return j();
            var i = t[0];
            if (i.isFoundDocument()) return new yl(e._firestore, r, i.key, i, n.converter);
            if (i.isNoDocument()) return new yl(e._firestore, r, n._key, null, n.converter);
            throw j();
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = Jl(t, this._firestore), i = Wl(r.converter, e, n), o = Xc(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
        return this._transaction.set(r._key, o), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        var o, u = Jl(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = I(e)) || e instanceof qc ? ol(this._dataReader, "Transaction.update", u._key, e, n, r) : il(this._dataReader, "Transaction.update", u._key, e), 
        this._transaction.update(u._key, o), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        var e = Jl(t, this._firestore);
        return this._transaction.delete(e._key), this;
    }, t;
}());

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @param options - An options object to configure maximum number of attempts to
 * commit.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */ function ph(t, r, i) {
    t = uc(t, Tc);
    var o = Object.assign(Object.assign({}, zl), i);
    return function(t) {
        if (t.maxAttempts < 1) throw new Y(H.INVALID_ARGUMENT, "Max attempts must be at least 1");
    }(o), function(t, r, i) {
        var o = this, u = new J;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(o, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return [ 4 /*yield*/ , function(t) {
                            return Qa(t).then((function(t) {
                                return t.datastore;
                            }));
                        }(t) ];

                      case 1:
                        return e = n.sent(), new Ba(t.asyncQueue, e, i, r, u).run(), [ 2 /*return*/ ];
                    }
                }));
            }));
        })), u.promise;
    }(_c(t), (function(e) {
        return r(new dh(t, e));
    }), o);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */ function vh() {
    return new $c("deleteField");
}

/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */ function yh() {
    return new tl("serverTimestamp");
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */ function mh() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
        return new el("arrayUnion", t);
}

/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function gh() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
        return new nl("arrayRemove", t);
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function wh(t) {
    return new rl("increment", t);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */ function bh(t) {
    return _c(t = uc(t, Tc)), new Yl(t, (function(e) {
        return lh(t, e);
    }))
    /**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;
}

function Ih(t, e) {
    _c(t = uc(t, Tc));
    var n = "string" == typeof e ? function(t) {
        try {
            return JSON.parse(t);
        } catch (t) {
            throw new Y(H.INVALID_ARGUMENT, "Failed to parse JSON:" + t.message);
        }
    }(e) : e, r = [];
    // PORTING NOTE: We don't return an error if the user has not enabled
    // persistence since `enableIndexeddbPersistence()` can fail on the Web.
        if (Array.isArray(n.indexes)) for (var i = 0, o = n.indexes; i < o.length; i++) {
        var u = o[i], s = Eh(u, "collectionGroup"), a = [];
        if (Array.isArray(u.fields)) for (var c = 0, l = u.fields; c < l.length; c++) {
            var h = l[c], f = dl("setIndexConfiguration", Eh(h, "fieldPath"));
            "CONTAINS" === h.arrayConfig ? a.push(new It(f, 2 /* CONTAINS */)) : "ASCENDING" === h.order ? a.push(new It(f, 0 /* ASCENDING */)) : "DESCENDING" === h.order && a.push(new It(f, 1 /* DESCENDING */));
        }
        r.push(new gt(gt.UNKNOWN_ID, s, a, Et.empty()));
    }
    // TODO(indexing): Configure indexes
        return Promise.resolve();
}

function Eh(t, e) {
    if ("string" != typeof t[e]) throw new Y(H.INVALID_ARGUMENT, "Missing string value for: " + e);
    return t[e];
}

/**
 * Cloud Firestore
 *
 * @packageDocumentation
 */ void 0 === fh && (fh = !0), L = i, o(new c("firestore", (function(t, e) {
    var n = e.options, r = t.getProvider("app").getImmediate(), i = new Tc(r, new tt(t.getProvider("auth-internal")), new it(t.getProvider("app-check-internal")));
    return n = Object.assign({
        useFetchStreams: fh
    }, n), i._setSettings(n), i;
}), "PUBLIC")), u(M, "3.4.10", void 0), 
// BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
u(M, "3.4.10", "esm5");

export { Ql as AbstractUserDataWriter, Bc as Bytes, Ec as CACHE_SIZE_UNLIMITED, dc as CollectionReference, hc as DocumentReference, bl as DocumentSnapshot, qc as FieldPath, Kc as FieldValue, Tc as Firestore, Y as FirestoreError, Gc as GeoPoint, Ic as LoadBundleTask, fc as Query, _l as QueryConstraint, Il as QueryDocumentSnapshot, El as QuerySnapshot, wl as SnapshotMetadata, ht as Timestamp, dh as Transaction, Yl as WriteBatch, ce as _DatabaseId, mt as _DocumentKey, ot as _EmptyAppCheckTokenProvider, $ as _EmptyAuthCredentialsProvider, yt as _FieldPath, uc as _cast, Q as _debugAssert, Zt as _isBase64Available, K as _logWarn, Ih as _setIndexConfiguration, nc as _validateIsNotUsedTogether, sh as addDoc, gh as arrayRemove, mh as arrayUnion, Cc as clearIndexedDbPersistence, pc as collection, vc as collectionGroup, lc as connectFirestoreEmulator, uh as deleteDoc, vh as deleteField, Mc as disableNetwork, yc as doc, Uc as documentId, Nc as enableIndexedDbPersistence, Ac as enableMultiTabIndexedDbPersistence, Oc as enableNetwork, Ul as endAt, ql as endBefore, _c as ensureFirestoreConfigured, lh as executeWrite, Xl as getDoc, Zl as getDocFromCache, th as getDocFromServer, eh as getDocs, nh as getDocsFromCache, rh as getDocsFromServer, Dc as getFirestore, wh as increment, Sc as initializeFirestore, Ol as limit, Ml as limitToLast, Lc as loadBundle, Fc as namedQuery, ah as onSnapshot, ch as onSnapshotsInSync, Cl as orderBy, xl as query, gc as queryEqual, mc as refEqual, ph as runTransaction, yh as serverTimestamp, ih as setDoc, q as setLogLevel, Sl as snapshotEqual, Fl as startAfter, Ll as startAt, Rc as terminate, oh as updateDoc, Vc as waitForPendingWrites, Al as where, bh as writeBatch };
//# sourceMappingURL=index.esm5.js.map
