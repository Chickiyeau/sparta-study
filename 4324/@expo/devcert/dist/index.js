"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const command_exists_1 = require("command-exists");
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
const constants_1 = require("./constants");
const platforms_1 = tslib_1.__importDefault(require("./platforms"));
const certificate_authority_1 = tslib_1.__importStar(require("./certificate-authority"));
exports.uninstall = certificate_authority_1.uninstall;
const certificates_1 = tslib_1.__importDefault(require("./certificates"));
const user_interface_1 = tslib_1.__importDefault(require("./user-interface"));
const debug = debug_1.default('devcert');
/**
 * Request an SSL certificate for the given app name signed by the devcert root
 * certificate authority. If devcert has previously generated a certificate for
 * that app name on this machine, it will reuse that certificate.
 *
 * If this is the first time devcert is being run on this machine, it will
 * generate and attempt to install a root certificate authority.
 *
 * Returns a promise that resolves with { key, cert }, where `key` and `cert`
 * are Buffers with the contents of the certificate private key and certificate
 * file, respectively
 *
 * If `options.getCaBuffer` is true, return value will include the ca certificate data
 * as { ca: Buffer }
 *
 * If `options.getCaPath` is true, return value will include the ca certificate path
 * as { caPath: string }
 */
function certificateFor(domain, options = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (constants_1.VALID_IP.test(domain)) {
            throw new Error('IP addresses are not supported currently');
        }
        if (!constants_1.VALID_DOMAIN.test(domain)) {
            throw new Error(`"${domain}" is not a valid domain name.`);
        }
        debug(`Certificate requested for ${domain}. Skipping certutil install: ${Boolean(options.skipCertutilInstall)}. Skipping hosts file: ${Boolean(options.skipHostsFile)}`);
        if (options.ui) {
            Object.assign(user_interface_1.default, options.ui);
        }
        if (!constants_1.isMac && !constants_1.isLinux && !constants_1.isWindows) {
            throw new Error(`Platform not supported: "${process.platform}"`);
        }
        if (!command_exists_1.sync('openssl')) {
            throw new Error('OpenSSL not found: OpenSSL is required to generate SSL certificates - make sure it is installed and available in your PATH');
        }
        let domainKeyPath = constants_1.pathForDomain(domain, `private-key.key`);
        let domainCertPath = constants_1.pathForDomain(domain, `certificate.crt`);
        if (!fs_1.existsSync(constants_1.rootCAKeyPath)) {
            debug('Root CA is not installed yet, so it must be our first run. Installing root CA ...');
            yield certificate_authority_1.default(options);
        }
        else if (options.getCaBuffer || options.getCaPath) {
            debug('Root CA is not readable, but it probably is because an earlier version of devcert locked it. Trying to fix...');
            yield certificate_authority_1.ensureCACertReadable(options);
        }
        if (!fs_1.existsSync(constants_1.pathForDomain(domain, `certificate.crt`))) {
            debug(`Can't find certificate file for ${domain}, so it must be the first request for ${domain}. Generating and caching ...`);
            yield certificates_1.default(domain);
        }
        if (!options.skipHostsFile) {
            yield platforms_1.default.addDomainToHostFileIfMissing(domain);
        }
        debug(`Returning domain certificate`);
        const ret = {
            key: fs_1.readFileSync(domainKeyPath),
            cert: fs_1.readFileSync(domainCertPath)
        };
        if (options.getCaBuffer)
            ret.ca = fs_1.readFileSync(constants_1.rootCACertPath);
        if (options.getCaPath)
            ret.caPath = constants_1.rootCACertPath;
        return ret;
    });
}
exports.certificateFor = certificateFor;
function hasCertificateFor(domain) {
    return fs_1.existsSync(constants_1.pathForDomain(domain, `certificate.crt`));
}
exports.hasCertificateFor = hasCertificateFor;
function configuredDomains() {
    return fs_1.readdirSync(constants_1.domainsDir);
}
exports.configuredDomains = configuredDomains;
function removeDomain(domain) {
    return rimraf_1.default.sync(constants_1.pathForDomain(domain));
}
exports.removeDomain = removeDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2V2YW5iYWNvbi9Eb2N1bWVudHMvR2l0SHViL2RldmNlcnQvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBNEY7QUFDNUYsMERBQWdDO0FBQ2hDLG1EQUF1RDtBQUN2RCw0REFBNEI7QUFDNUIsMkNBVXFCO0FBQ3JCLG9FQUEwQztBQUMxQyx5RkFBdUc7QUFHOUYsb0JBSG1ELGlDQUFTLENBR25EO0FBRmxCLDBFQUF1RDtBQUN2RCw4RUFBcUQ7QUFHckQsTUFBTSxLQUFLLEdBQUcsZUFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBNkJyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCx3QkFBd0QsTUFBYyxFQUFFLFVBQWEsRUFBTzs7UUFDMUYsSUFBSSxvQkFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsd0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLE1BQU0sK0JBQStCLENBQUMsQ0FBQztTQUM1RDtRQUNELEtBQUssQ0FBQyw2QkFBOEIsTUFBTyxnQ0FBaUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBRSwwQkFBMkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0ssSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxpQkFBSyxJQUFJLENBQUMsbUJBQU8sSUFBSSxDQUFDLHFCQUFTLEVBQUU7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNkIsT0FBTyxDQUFDLFFBQVMsR0FBRyxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLENBQUMscUJBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDRIQUE0SCxDQUFDLENBQUM7U0FDL0k7UUFFRCxJQUFJLGFBQWEsR0FBRyx5QkFBYSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdELElBQUksY0FBYyxHQUFHLHlCQUFhLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLGVBQU0sQ0FBQyx5QkFBYSxDQUFDLEVBQUU7WUFDMUIsS0FBSyxDQUFDLG1GQUFtRixDQUFDLENBQUM7WUFDM0YsTUFBTSwrQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ25ELEtBQUssQ0FBQywrR0FBK0csQ0FBQyxDQUFDO1lBQ3ZILE1BQU0sNENBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsZUFBTSxDQUFDLHlCQUFhLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUMsRUFBRTtZQUNyRCxLQUFLLENBQUMsbUNBQW9DLE1BQU8seUNBQTBDLE1BQU8sOEJBQThCLENBQUMsQ0FBQztZQUNsSSxNQUFNLHNCQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDMUIsTUFBTSxtQkFBZSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVEO1FBRUQsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFFdEMsTUFBTSxHQUFHLEdBQUc7WUFDVixHQUFHLEVBQUUsaUJBQVEsQ0FBQyxhQUFhLENBQUM7WUFDNUIsSUFBSSxFQUFFLGlCQUFRLENBQUMsY0FBYyxDQUFDO1NBQ2IsQ0FBQztRQUNwQixJQUFJLE9BQU8sQ0FBQyxXQUFXO1lBQUcsR0FBaUIsQ0FBQyxFQUFFLEdBQUcsaUJBQVEsQ0FBQywwQkFBYyxDQUFDLENBQUM7UUFDMUUsSUFBSSxPQUFPLENBQUMsU0FBUztZQUFHLEdBQWUsQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQztRQUVoRSxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FBQTtBQW5ERCx3Q0FtREM7QUFFRCwyQkFBa0MsTUFBYztJQUM5QyxPQUFPLGVBQU0sQ0FBQyx5QkFBYSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUZELDhDQUVDO0FBRUQ7SUFDRSxPQUFPLGdCQUFPLENBQUMsc0JBQVUsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCw4Q0FFQztBQUVELHNCQUE2QixNQUFjO0lBQ3pDLE9BQU8sZ0JBQU0sQ0FBQyxJQUFJLENBQUMseUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFGRCxvQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlYWRGaWxlU3luYyBhcyByZWFkRmlsZSwgcmVhZGRpclN5bmMgYXMgcmVhZGRpciwgZXhpc3RzU3luYyBhcyBleGlzdHMgfSBmcm9tICdmcyc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgc3luYyBhcyBjb21tYW5kRXhpc3RzIH0gZnJvbSAnY29tbWFuZC1leGlzdHMnO1xuaW1wb3J0IHJpbXJhZiBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHtcbiAgaXNNYWMsXG4gIGlzTGludXgsXG4gIGlzV2luZG93cyxcbiAgcGF0aEZvckRvbWFpbixcbiAgZG9tYWluc0RpcixcbiAgcm9vdENBS2V5UGF0aCxcbiAgcm9vdENBQ2VydFBhdGgsXG4gIFZBTElEX0RPTUFJTixcbiAgVkFMSURfSVBcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGN1cnJlbnRQbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3Jtcyc7XG5pbXBvcnQgaW5zdGFsbENlcnRpZmljYXRlQXV0aG9yaXR5LCB7IGVuc3VyZUNBQ2VydFJlYWRhYmxlLCB1bmluc3RhbGwgfSBmcm9tICcuL2NlcnRpZmljYXRlLWF1dGhvcml0eSc7XG5pbXBvcnQgZ2VuZXJhdGVEb21haW5DZXJ0aWZpY2F0ZSBmcm9tICcuL2NlcnRpZmljYXRlcyc7XG5pbXBvcnQgVUksIHsgVXNlckludGVyZmFjZSB9IGZyb20gJy4vdXNlci1pbnRlcmZhY2UnO1xuZXhwb3J0IHsgdW5pbnN0YWxsIH07XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQnKTtcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIC8qIGV4dGVuZHMgUGFydGlhbDxJQ2FCdWZmZXJPcHRzICYgSUNhUGF0aE9wdHM+ICAqL3tcbiAgLyoqIFJldHVybiB0aGUgQ0EgY2VydGlmaWNhdGUgZGF0YT8gKi9cbiAgZ2V0Q2FCdWZmZXI/OiBib29sZWFuO1xuICAvKiogUmV0dXJuIHRoZSBwYXRoIHRvIHRoZSBDQSBjZXJ0aWZpY2F0ZT8gKi9cbiAgZ2V0Q2FQYXRoPzogYm9vbGVhbjtcbiAgLyoqIElmIGBjZXJ0dXRpbGAgaXMgbm90IGluc3RhbGxlZCBhbHJlYWR5IChmb3IgdXBkYXRpbmcgbnNzIGRhdGFiYXNlczsgZS5nLiBmaXJlZm94KSwgZG8gbm90IGF0dGVtcHQgdG8gaW5zdGFsbCBpdCAqL1xuICBza2lwQ2VydHV0aWxJbnN0YWxsPzogYm9vbGVhbixcbiAgLyoqIERvIG5vdCB1cGRhdGUgeW91ciBzeXN0ZW1zIGhvc3QgZmlsZSB3aXRoIHRoZSBkb21haW4gbmFtZSBvZiB0aGUgY2VydGlmaWNhdGUgKi9cbiAgc2tpcEhvc3RzRmlsZT86IGJvb2xlYW4sXG4gIC8qKiBVc2VyIGludGVyZmFjZSBob29rcyAqL1xuICB1aT86IFVzZXJJbnRlcmZhY2Vcbn1cblxuaW50ZXJmYWNlIElDYUJ1ZmZlciB7XG4gIGNhOiBCdWZmZXI7XG59XG5pbnRlcmZhY2UgSUNhUGF0aCB7XG4gIGNhUGF0aDogc3RyaW5nO1xufVxuaW50ZXJmYWNlIElEb21haW5EYXRhIHtcbiAga2V5OiBCdWZmZXI7XG4gIGNlcnQ6IEJ1ZmZlcjtcbn1cbnR5cGUgSVJldHVybkNhPE8gZXh0ZW5kcyBPcHRpb25zPiA9IE9bJ2dldENhQnVmZmVyJ10gZXh0ZW5kcyB0cnVlID8gSUNhQnVmZmVyIDogZmFsc2U7XG50eXBlIElSZXR1cm5DYVBhdGg8TyBleHRlbmRzIE9wdGlvbnM+ID0gT1snZ2V0Q2FQYXRoJ10gZXh0ZW5kcyB0cnVlID8gSUNhUGF0aCA6IGZhbHNlO1xudHlwZSBJUmV0dXJuRGF0YTxPIGV4dGVuZHMgT3B0aW9ucyA9IHt9PiA9IChJRG9tYWluRGF0YSkgJiAoSVJldHVybkNhPE8+KSAmIChJUmV0dXJuQ2FQYXRoPE8+KTtcblxuLyoqXG4gKiBSZXF1ZXN0IGFuIFNTTCBjZXJ0aWZpY2F0ZSBmb3IgdGhlIGdpdmVuIGFwcCBuYW1lIHNpZ25lZCBieSB0aGUgZGV2Y2VydCByb290XG4gKiBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkuIElmIGRldmNlcnQgaGFzIHByZXZpb3VzbHkgZ2VuZXJhdGVkIGEgY2VydGlmaWNhdGUgZm9yXG4gKiB0aGF0IGFwcCBuYW1lIG9uIHRoaXMgbWFjaGluZSwgaXQgd2lsbCByZXVzZSB0aGF0IGNlcnRpZmljYXRlLlxuICpcbiAqIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgZGV2Y2VydCBpcyBiZWluZyBydW4gb24gdGhpcyBtYWNoaW5lLCBpdCB3aWxsXG4gKiBnZW5lcmF0ZSBhbmQgYXR0ZW1wdCB0byBpbnN0YWxsIGEgcm9vdCBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkuXG4gKlxuICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHsga2V5LCBjZXJ0IH0sIHdoZXJlIGBrZXlgIGFuZCBgY2VydGBcbiAqIGFyZSBCdWZmZXJzIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSBjZXJ0aWZpY2F0ZSBwcml2YXRlIGtleSBhbmQgY2VydGlmaWNhdGVcbiAqIGZpbGUsIHJlc3BlY3RpdmVseVxuICogXG4gKiBJZiBgb3B0aW9ucy5nZXRDYUJ1ZmZlcmAgaXMgdHJ1ZSwgcmV0dXJuIHZhbHVlIHdpbGwgaW5jbHVkZSB0aGUgY2EgY2VydGlmaWNhdGUgZGF0YVxuICogYXMgeyBjYTogQnVmZmVyIH1cbiAqIFxuICogSWYgYG9wdGlvbnMuZ2V0Q2FQYXRoYCBpcyB0cnVlLCByZXR1cm4gdmFsdWUgd2lsbCBpbmNsdWRlIHRoZSBjYSBjZXJ0aWZpY2F0ZSBwYXRoXG4gKiBhcyB7IGNhUGF0aDogc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNlcnRpZmljYXRlRm9yPE8gZXh0ZW5kcyBPcHRpb25zPihkb21haW46IHN0cmluZywgb3B0aW9uczogTyA9IHt9IGFzIE8pOiBQcm9taXNlPElSZXR1cm5EYXRhPE8+PiB7XG4gIGlmIChWQUxJRF9JUC50ZXN0KGRvbWFpbikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lQIGFkZHJlc3NlcyBhcmUgbm90IHN1cHBvcnRlZCBjdXJyZW50bHknKTtcbiAgfVxuICBpZiAoIVZBTElEX0RPTUFJTi50ZXN0KGRvbWFpbikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtkb21haW59XCIgaXMgbm90IGEgdmFsaWQgZG9tYWluIG5hbWUuYCk7XG4gIH1cbiAgZGVidWcoYENlcnRpZmljYXRlIHJlcXVlc3RlZCBmb3IgJHsgZG9tYWluIH0uIFNraXBwaW5nIGNlcnR1dGlsIGluc3RhbGw6ICR7IEJvb2xlYW4ob3B0aW9ucy5za2lwQ2VydHV0aWxJbnN0YWxsKSB9LiBTa2lwcGluZyBob3N0cyBmaWxlOiAkeyBCb29sZWFuKG9wdGlvbnMuc2tpcEhvc3RzRmlsZSkgfWApO1xuXG4gIGlmIChvcHRpb25zLnVpKSB7XG4gICAgT2JqZWN0LmFzc2lnbihVSSwgb3B0aW9ucy51aSk7XG4gIH1cblxuICBpZiAoIWlzTWFjICYmICFpc0xpbnV4ICYmICFpc1dpbmRvd3MpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBsYXRmb3JtIG5vdCBzdXBwb3J0ZWQ6IFwiJHsgcHJvY2Vzcy5wbGF0Zm9ybSB9XCJgKTtcbiAgfVxuXG4gIGlmICghY29tbWFuZEV4aXN0cygnb3BlbnNzbCcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcGVuU1NMIG5vdCBmb3VuZDogT3BlblNTTCBpcyByZXF1aXJlZCB0byBnZW5lcmF0ZSBTU0wgY2VydGlmaWNhdGVzIC0gbWFrZSBzdXJlIGl0IGlzIGluc3RhbGxlZCBhbmQgYXZhaWxhYmxlIGluIHlvdXIgUEFUSCcpO1xuICB9XG5cbiAgbGV0IGRvbWFpbktleVBhdGggPSBwYXRoRm9yRG9tYWluKGRvbWFpbiwgYHByaXZhdGUta2V5LmtleWApO1xuICBsZXQgZG9tYWluQ2VydFBhdGggPSBwYXRoRm9yRG9tYWluKGRvbWFpbiwgYGNlcnRpZmljYXRlLmNydGApO1xuXG4gIGlmICghZXhpc3RzKHJvb3RDQUtleVBhdGgpKSB7XG4gICAgZGVidWcoJ1Jvb3QgQ0EgaXMgbm90IGluc3RhbGxlZCB5ZXQsIHNvIGl0IG11c3QgYmUgb3VyIGZpcnN0IHJ1bi4gSW5zdGFsbGluZyByb290IENBIC4uLicpO1xuICAgIGF3YWl0IGluc3RhbGxDZXJ0aWZpY2F0ZUF1dGhvcml0eShvcHRpb25zKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmdldENhQnVmZmVyIHx8IG9wdGlvbnMuZ2V0Q2FQYXRoKSB7XG4gICAgZGVidWcoJ1Jvb3QgQ0EgaXMgbm90IHJlYWRhYmxlLCBidXQgaXQgcHJvYmFibHkgaXMgYmVjYXVzZSBhbiBlYXJsaWVyIHZlcnNpb24gb2YgZGV2Y2VydCBsb2NrZWQgaXQuIFRyeWluZyB0byBmaXguLi4nKTtcbiAgICBhd2FpdCBlbnN1cmVDQUNlcnRSZWFkYWJsZShvcHRpb25zKTtcbiAgfVxuXG4gIGlmICghZXhpc3RzKHBhdGhGb3JEb21haW4oZG9tYWluLCBgY2VydGlmaWNhdGUuY3J0YCkpKSB7XG4gICAgZGVidWcoYENhbid0IGZpbmQgY2VydGlmaWNhdGUgZmlsZSBmb3IgJHsgZG9tYWluIH0sIHNvIGl0IG11c3QgYmUgdGhlIGZpcnN0IHJlcXVlc3QgZm9yICR7IGRvbWFpbiB9LiBHZW5lcmF0aW5nIGFuZCBjYWNoaW5nIC4uLmApO1xuICAgIGF3YWl0IGdlbmVyYXRlRG9tYWluQ2VydGlmaWNhdGUoZG9tYWluKTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5za2lwSG9zdHNGaWxlKSB7XG4gICAgYXdhaXQgY3VycmVudFBsYXRmb3JtLmFkZERvbWFpblRvSG9zdEZpbGVJZk1pc3NpbmcoZG9tYWluKTtcbiAgfVxuXG4gIGRlYnVnKGBSZXR1cm5pbmcgZG9tYWluIGNlcnRpZmljYXRlYCk7XG5cbiAgY29uc3QgcmV0ID0ge1xuICAgIGtleTogcmVhZEZpbGUoZG9tYWluS2V5UGF0aCksXG4gICAgY2VydDogcmVhZEZpbGUoZG9tYWluQ2VydFBhdGgpXG4gIH0gYXMgSVJldHVybkRhdGE8Tz47XG4gIGlmIChvcHRpb25zLmdldENhQnVmZmVyKSAocmV0IGFzIElDYUJ1ZmZlcikuY2EgPSByZWFkRmlsZShyb290Q0FDZXJ0UGF0aCk7XG4gIGlmIChvcHRpb25zLmdldENhUGF0aCkgKHJldCBhcyBJQ2FQYXRoKS5jYVBhdGggPSByb290Q0FDZXJ0UGF0aDtcblxuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2VydGlmaWNhdGVGb3IoZG9tYWluOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGV4aXN0cyhwYXRoRm9yRG9tYWluKGRvbWFpbiwgYGNlcnRpZmljYXRlLmNydGApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZWREb21haW5zKCkge1xuICByZXR1cm4gcmVhZGRpcihkb21haW5zRGlyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURvbWFpbihkb21haW46IHN0cmluZykge1xuICByZXR1cm4gcmltcmFmLnN5bmMocGF0aEZvckRvbWFpbihkb21haW4pKTtcbn1cbiJdfQ==