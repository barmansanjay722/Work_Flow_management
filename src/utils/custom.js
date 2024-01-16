import AWS from 'aws-sdk';

export const imageIdGenerate = (userId) => {
  let u_id = userId;
  if (u_id > 30) {
    return imageIdGenerate(u_id - 30);
  } else {
    return u_id;
  }
}

export const updateUserImage = (imageUrl) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/users/profile/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ image_url: imageUrl })
  })
  .then(res => res.json())
  .catch(error => {
    console.error(error);
    window.toastr.error('An error occurred while updating the image');
  });
}

export const deletePreviousImage = async (previousUrl) => {
  const previousImageUrl = previousUrl.split('user-images/');

  if(previousImageUrl[1]){
    const listParams = {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
      Prefix: `user-images/${previousImageUrl[1]}`
    };

    const s3 = new AWS.S3({
      // Configure AWS credentials and region accordingly
      accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
      region: process.env.REACT_APP_AWS_S3_REGION
    });

    try {
      const { Contents } = await s3.listObjects(listParams).promise();
      if (Contents.length > 0) {
        const deleteParams = {
          Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
          Delete: { Objects: Contents.map(obj => ({ Key: obj.Key })) }
        };
        await s3.deleteObjects(deleteParams).promise();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getS3Object = () => {
  const s3 = new AWS.S3({
    // Configure AWS credentials and region accordingly
    accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
    region: process.env.REACT_APP_AWS_S3_REGION
  });
  return s3;
}

export const getS3BucketName = () => {
  return process.env.REACT_APP_AWS_S3_BUCKET ?? 'valerion-health-app';
}

export const uploadBlobToS3 = (photoBlob, fileKey) => {
  if(photoBlob) {
    let uploadedLink = false;
    const s3 = getS3Object();
    s3.upload({
      Bucket: getS3BucketName(),
      Key: fileKey,
      Body: photoBlob,
    }, (err, data) => {
      if (err) {
        console.error('Error uploading to S3:', err);
      } else {
        debugger;
        console.log('File uploaded to S3 successfully:', data.Location);
        uploadedLink = data.Location;
        updateUserImage(uploadedLink).then((response) => {
          debugger;
          if (response.success) {
            localStorage.userImageUrl = uploadedLink;
            // There is a useEffect hooks which gets trigger on change of userImageUrl key in Header.jsx leads to updating header profile picture
          }
        });
      }
    });
  } else {
    return false;
  }
}

export const FileMimeType = {
  'audio/x-mpeg': 'mpega',
  'application/postscript': 'ps',
  'audio/x-aiff': 'aiff',
  'application/x-aim': 'aim',
  'image/x-jg': 'art',
  'video/x-ms-asf': 'asx',
  'audio/basic': 'ulw',
  'video/x-msvideo': 'avi',
  'video/x-rad-screenplay': 'avx',
  'application/x-bcpio': 'bcpio',
  'application/octet-stream': 'exe',
  'image/bmp': 'dib',
  'text/html': 'html',
  'application/x-cdf': 'cdf',
  'application/pkix-cert': 'cer',
  'application/java': 'class',
  'application/x-cpio': 'cpio',
  'application/x-csh': 'csh',
  'text/css': 'css',
  'application/msword': 'doc',
  'application/xml-dtd': 'dtd',
  'video/x-dv': 'dv',
  'application/x-dvi': 'dvi',
  'application/vnd.ms-fontobject': 'eot',
  'text/x-setext': 'etx',
  'image/gif': 'gif',
  'application/x-gtar': 'gtar',
  'application/x-gzip': 'gz',
  'application/x-hdf': 'hdf',
  'application/mac-binhex40': 'hqx',
  'text/x-component': 'htc',
  'image/ief': 'ief',
  'text/vnd.sun.j2me.app-descriptor': 'jad',
  'application/java-archive': 'jar',
  'text/x-java-source': 'java',
  'application/x-java-jnlp-file': 'jnlp',
  'image/jpeg': 'jpg',
  'application/javascript': 'js',
  'text/plain': 'txt',
  'application/json': 'json',
  'audio/midi': 'midi',
  'application/x-latex': 'latex',
  'audio/x-mpegurl': 'm3u',
  'image/x-macpaint': 'pnt',
  'text/troff': 'tr',
  'application/mathml+xml': 'mathml',
  'application/x-mif': 'mif',
  'video/quicktime': 'qt',
  'video/x-sgi-movie': 'movie',
  'audio/mpeg': 'mpa',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpg',
  'video/mpeg2': 'mpv2',
  'application/x-wais-source': 'src',
  'application/x-netcdf': 'nc',
  'application/oda': 'oda',
  'application/vnd.oasis.opendocument.database': 'odb',
  'application/vnd.oasis.opendocument.chart': 'odc',
  'application/vnd.oasis.opendocument.formula': 'odf',
  'application/vnd.oasis.opendocument.graphics': 'odg',
  'application/vnd.oasis.opendocument.image': 'odi',
  'application/vnd.oasis.opendocument.text-master': 'odm',
  'application/vnd.oasis.opendocument.presentation': 'odp',
  'application/vnd.oasis.opendocument.spreadsheet': 'ods',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/vnd.oasis.opendocument.graphics-template': 'otg',
  'application/vnd.oasis.opendocument.text-web': 'oth',
  'application/vnd.oasis.opendocument.presentation-template': 'otp',
  'application/vnd.oasis.opendocument.spreadsheet-template': 'ots',
  'application/vnd.oasis.opendocument.text-template': 'ott',
  'application/ogg': 'ogx',
  'video/ogg': 'ogv',
  'audio/ogg': 'spx',
  'application/x-font-opentype': 'otf',
  'audio/flac': 'flac',
  'application/annodex': 'anx',
  'audio/annodex': 'axa',
  'video/annodex': 'axv',
  'application/xspf+xml': 'xspf',
  'image/x-portable-bitmap': 'pbm',
  'image/pict': 'pict',
  'application/pdf': 'pdf',
  'image/x-portable-graymap': 'pgm',
  'audio/x-scpls': 'pls',
  'image/png': 'png',
  'image/x-portable-anymap': 'pnm',
  'image/x-portable-pixmap': 'ppm',
  'application/vnd.ms-powerpoint': 'pps',
  'image/vnd.adobe.photoshop': 'psd',
  'image/x-quicktime': 'qtif',
  'image/x-cmu-raster': 'ras',
  'application/rdf+xml': 'rdf',
  'image/x-rgb': 'rgb',
  'application/vnd.rn-realmedia': 'rm',
  'application/rtf': 'rtf',
  'text/richtext': 'rtx',
  'application/font-sfnt': 'sfnt',
  'application/x-sh': 'sh',
  'application/x-shar': 'shar',
  'application/x-stuffit': 'sit',
  'application/x-sv4cpio': 'sv4cpio',
  'application/x-sv4crc': 'sv4crc',
  'image/svg+xml': 'svgz',
  'application/x-shockwave-flash': 'swf',
  'application/x-tar': 'tar',
  'application/x-tcl': 'tcl',
  'application/x-tex': 'tex',
  'application/x-texinfo': 'texinfo',
  'image/tiff': 'tiff',
  'text/tab-separated-values': 'tsv',
  'application/x-font-ttf': 'ttf',
  'application/x-ustar': 'ustar',
  'application/voicexml+xml': 'vxml',
  'image/x-xbitmap': 'xbm',
  'application/xhtml+xml': 'xhtml',
  'application/vnd.ms-excel': 'xls',
  'application/xml': 'xsl',
  'image/x-xpixmap': 'xpm',
  'application/xslt+xml': 'xslt',
  'application/vnd.mozilla.xul+xml': 'xul',
  'image/x-xwindowdump': 'xwd',
  'application/vnd.visio': 'vsd',
  'audio/x-wav': 'wav',
  'image/vnd.wap.wbmp': 'wbmp',
  'text/vnd.wap.wml': 'wml',
  'application/vnd.wap.wmlc': 'wmlc',
  'text/vnd.wap.wmlsc': 'wmls',
  'application/vnd.wap.wmlscriptc': 'wmlscriptc',
  'video/x-ms-wmv': 'wmv',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'model/vrml': 'wrl',
  'application/wspolicy+xml': 'wspolicy',
  'application/x-compress': 'z',
  'application/zip': 'zip'
};