import CMS from 'netlify-cms'

import ArticlePreview from './preview-templates/ArticlePreview'
import MessagePreview from './preview-templates/MessagePreview'
import PagePreview from './preview-templates/PagePreview'

CMS.registerPreviewTemplate('article', ArticlePreview)
CMS.registerPreviewTemplate('message', MessagePreview)
CMS.registerPreviewTemplate('page', PagePreview)
