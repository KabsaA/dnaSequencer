#------------------------------------------------------------------------------#
# Beginning of DNSAR Dockerfile
#------------------------------------------------------------------------------#

#------------------------------------------------------------------------------#
# From the ncbi/blast docker image for the search functionality
#------------------------------------------------------------------------------#
FROM ncbi/blast
RUN mkdir website

#------------------------------------------------------------------------------#
# Downloading the database to search against
#------------------------------------------------------------------------------#
WORKDIR /blast/blastdb
RUN update_blastdb.pl --decompress 16S_ribosomal_RNA 

#------------------------------------------------------------------------------#
# Downloading NodeJS
#------------------------------------------------------------------------------#
WORKDIR /blast/website
RUN apt-get update && \
    apt-get install curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \
    apt-get -y install nodejs
ENV NODE_ENV=production
EXPOSE 8000 3000

#------------------------------------------------------------------------------#
# Starting NODE
#------------------------------------------------------------------------------#
CMD ["npm", "run", "server", "--prefix", "/blast/website"]