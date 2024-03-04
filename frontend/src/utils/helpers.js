export function protect(fn, arg) {
  if (fn) {
    try {
      return fn(arg);
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
  else {
    return null;
  }
}

export function isValid(target) {
  const isValidRecursive = function (current) {
    if (current.dataset.invalid) {
      return false;
    }
    for (const child of current.children) {
      if (!isValidRecursive(child)) {
        return false;
      }
    }
    return true;
  }
  return isValidRecursive(target);
}

export function format(value, type, dateFormat, moneySymbol) {
  if (value !== null && value !== undefined) {
    switch (type) {
      case 'integer': {
        return formatNumber(value, 0);
      }
      case 'decimal': {
        return formatNumber(value, 2);
      }
      case 'money': {
        return moneySymbol + ' ' + formatNumber(value, 2);
      }
      case 'percentage': {
        return formatNumber(value * 100, 2) + ' %';
      }
      case 'datetime': {
        return formatDatetime(value, dateFormat);
      }
      case 'date': {
        return formatDate(value, dateFormat);
      }
      default: {
        return value;
      }
    }
  }
  else {
    return '';
  }
}

export function formatNumber(number, decimals) {
  const parts = number.toFixed(decimals).toString().split('.');
  if (decimals > 0) {
    if (parts.length === 1) {
      return (parts[0] + '.').padEnd(decimals, '0');
    }
    else {
      return (parts[0] + '.' + parts[1]).padEnd(decimals - parts[1].length, '0');
    }
  }
  else {
    return parts[0];
  }
}

export function formatDate(dateIso8601, dateFormat) {
  const date = new Date(dateIso8601);
  const yearPart = date.getFullYear().toString();
  const monthPart = (date.getMonth() + 1).toString().padStart(2, '0');
  const dayPart = (date.getDate()).toString().padStart(2, '0');
  return dateFormat.replace('yyyy', yearPart).replace('mm', monthPart).replace('dd', dayPart);
}

export function formatDatetime(dateIso8601, dateFormat) {
  const date = new Date(dateIso8601);
  const yearPart = date.getFullYear().toString();
  const monthPart = (date.getMonth() + 1).toString().padStart(2, '0');
  const dayPart = (date.getDate()).toString().padStart(2, '0');
  let hour = date.getHours();
  let isAm = true;
  if (hour === 0) {
    hour = 12;
  }
  else if (hour >= 12) {
    if (hour > 12) {
      hour -= 12;
    }
    isAm = false;
  }
  const hourPart = hour.toString().padStart(2, '0');
  const minutesPart = (date.getMinutes()).toString().padStart(2, '0');
  const amPmPart = (isAm ? 'AM' : 'PM');
  return dateFormat.replace('yyyy', yearPart).replace('mm', monthPart).replace('dd', dayPart) + ` ${hourPart}:${minutesPart} ${amPmPart}`;
}

export function download(fileName, data) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.click();
  window.URL.revokeObjectURL(url);
}

export function getBreadcrumbs(target, cutter) {
  const getWebPageBreadcrumb = function (current) {
    if (current.dataset.breadcrumb) {
      if (current.dataset.breadcrumb.startsWith('WebPage:')) {
        return current.dataset.breadcrumb;
      }
      return null;
    }
    for (const child of current.children) {
      const webPageBreadcrumb = getWebPageBreadcrumb(child);
      if (webPageBreadcrumb) {
        return webPageBreadcrumb;
      }
    }
  }
  const breadcrumbs = [];
  let current = target;
  while (current) {
    if (current.dataset.breadcrumb) {
      const breadcrumbParts = current.dataset.breadcrumb.split(' ');
      for (const breadcrumbPart of breadcrumbParts.reverse()) {
        breadcrumbs.unshift(breadcrumbPart);
      }
    }
    current = current.parentElement;
  }
  if (breadcrumbs.length === 0) {
    const webPageBreadcrumb = getWebPageBreadcrumb(target);
    if (webPageBreadcrumb) {
      breadcrumbs.push(webPageBreadcrumb);
    }
  }
  if (cutter) {
    while (!breadcrumbs[breadcrumbs.length - 1].startsWith(cutter + ':')) {
      breadcrumbs.pop();
    }
  }
  return breadcrumbs;
}

export function getJoinedBreadcrumbs(target, cutter) {
  return getBreadcrumbs(target, cutter).join(' ');
}
